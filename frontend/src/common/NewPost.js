import React, { useEffect, useState } from 'react'
import UserNavigationBar from './User/UserNavigationBar'
import NewPostForm from './NewPostForm'
import { createNewPost } from './common/serverFunctions'
import { useCookies } from 'react-cookie'
import { fetchMusicalObjects } from './common/serverFunctions'
import { useNavigate } from 'react-router-dom'
import { useLocation
 } from 'react-router-dom'
const NewPost = () => {
  const [cookies] = useCookies(['userId']);
  const navigate = useNavigate();
  const userId = cookies['userId'];
  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
  const query = useQuery();
  const type = query.get("type")
  const musicalObjectId = query.get("id")
  const [musicalObject, setMusicalObject] = useState();


  useEffect(() =>{
    const fetchData = async () => {
      const object = (await fetchMusicalObjects(type, [musicalObjectId]))[0];
      setMusicalObject(object);
    }
    fetchData();
  }, [])


  const onSubmit = async (title, content) => {
    const Post = {
      Title: title,
      Content: content,
      MusicalObject: {
        Type: type,
        Id: musicalObjectId
      },
      UserId: userId
    }
    await createNewPost(Post);
    navigate('/profile');
  }
  return (
    <div>
        <UserNavigationBar />
          new post: <br />
          type: {type} <br />
        <NewPostForm onSubmit={onSubmit}/>
    </div>
  )
}

export default NewPost