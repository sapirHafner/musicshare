import React from 'react'
import { getMusicalEntityBoxComponent } from '../Common/Utilities'
const Post = ({post}) => {
  const musicalEntityComponent = getMusicalEntityBoxComponent(post.MusicalEntity)
  return (
    <div>
        <br />
        {musicalEntityComponent}
        <h5>{post.Title}</h5>
        <p>{post.Content}</p>
        <br />
        ___________ <br />
        |{post.User.FirstName} {post.User.LastName} | <br / >
        ___________ <br />
    </div>
  )
}

export default Post