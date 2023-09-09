import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import UserPage from '../Components/UserPage'
import NewPostForm from '../Components/Forms/NewPostForm'

import { createNewPost } from '../Common/ServerFunctions/PostsFunctions'
import { fetchMusicalEntity } from '../Common/ServerFunctions/MusicalEntitiesFunctions'
import { useQuery, getMusicalEntityBoxComponent } from '../Common/Utilities'

const NewPost = () => {
  const [cookies] = useCookies(['userId', 'userType']);
  const { userId, userType } = cookies;

  const navigate = useNavigate();

  const query = useQuery();
  const type = query.get("type")
  const musicalEntityId = query.get("id")
  const [ musicalEntityComponent, setMusicalEntityComponent ] = useState();
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() =>{
    const fetchData = async () => {
      const musicalEntity = await fetchMusicalEntity({
        type,
        id: musicalEntityId
      });
      setMusicalEntityComponent(getMusicalEntityBoxComponent(musicalEntity));
      setIsLoaded(true);
    }
    fetchData();
  }, [])

  const onSubmit = async (title, content) => {
    const Post = {
      title,
      content,
      musicalEntity: {
        type,
        id: musicalEntityId
      },
      userId
    }
    await createNewPost(Post);
    userType === "user" ? navigate(`/user/${userId}`) : navigate('/');
  }


  return (
    userType === "user" ?
    <UserPage isLoaded={true} component=
      <div>
        {musicalEntityComponent}
        <NewPostForm onSubmit={onSubmit}/>
      </div>
    />
  :
  <div>
    {musicalEntityComponent}
    <NewPostForm onSubmit={onSubmit}/>
  </div>
  )
}

export default NewPost