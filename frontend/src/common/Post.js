import React from 'react'
import { getMusicalEntityBoxComponent } from '../Common/Utilities'
const Post = ({post}) => {
  const musicalEntityComponent = getMusicalEntityBoxComponent(post.MusicalEntity)

  return (
    <div>
        <br />
        {musicalEntityComponent}
        <h5>{title}</h5>
        <p>{content}</p>
        <br />
        ___________ <br />
        |{user.FirstName} {user.LastName} | <br / >
        ___________ <br />

    </div>
  )
}

export default Post