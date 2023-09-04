import React, { useEffect, useState } from 'react'
import UserNavigationBar from '../User/UserNavigationBar'
import NewPostForm from './NewPostForm'
import { createNewPost } from '../ServerFunctions/PostsFunctions'
import { fetchMusicalEntity } from '../ServerFunctions/MusicalEntitiesFunctions'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useQuery, getMusicalEntityBoxComponent } from './Utilities'
import LoadingScreen from '../Common/LoadingScreen';

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
        Type: type,
        Id: musicalEntityId
      });
      setMusicalEntityComponent(getMusicalEntityBoxComponent(musicalEntity));
       setIsLoaded(true);
    }
    fetchData();
  }, [])

  const onSubmit = async (title, content) => {
    const Post = {
      Title: title,
      Content: content,
      MusicalEntity: {
        Type: type,
        Id: musicalEntityId
      },
      UserId: userId
    }
    await createNewPost(Post);
    userType === "user" ? navigate(`/user/${userId}`) : navigate('/');
  }


  return (
    <div className='grid-container'>
        <UserNavigationBar />
        <div className='content'>
          {
            isLoaded ?
            <div>
              {musicalEntityComponent}
              <NewPostForm onSubmit={onSubmit}/>
            </div>
            :
            <LoadingScreen />
          }
        </div>
    </div>
  )
}

export default NewPost