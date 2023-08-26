import React, { useEffect, useState } from 'react'
import UserNavigationBar from '../User/UserNavigationBar'
import NewPostForm from './NewPostForm'
import { createNewPost } from '../ServerFunctions/PostsFunctions'
import { fetchMusicalObject } from '../ServerFunctions/MusicalObjectsFunctions'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useQuery } from './Utilities'

const NewPost = () => {
  const [cookies] = useCookies(['userId']);
  const userId = cookies['userId'];

  const navigate = useNavigate();

  const query = useQuery();
  const type = query.get("type")
  const musicalObjectId = query.get("id")

  const [musicalObject, setMusicalObject] = useState();


  useEffect(() =>{
    const fetchData = async () => {
 //     setMusicalObject(await fetchMusicalObject(type, musicalObjectId));
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
    navigate(`/user/${userId}`);
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