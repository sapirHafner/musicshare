import React from 'react'
import MusicshareNavigationBar from './MusicshareNavigationBar'
import NewPostForm from './NewPostForm'
import { createNewPost } from './serverFunctions'
import { useCookies } from 'react-cookie'

const NewPost = () => {
  const [cookies] = useCookies(['userId']);
  const userId = cookies['userId'];

  const onSubmit = async (title, content, objectType) => {
    const Post = {
      Title: title,
      Content: content,
      MusicalObject: {
        type: objectType,
        objectId: "ghghvhgvghvghsdgsgd"
      },
      UserId: userId
    }
    await createNewPost();
  }
  return (
    <div>
        <MusicshareNavigationBar />
          new post:
        <NewPostForm onSubmit={onSubmit}/>
    </div>
  )
}

export default NewPost