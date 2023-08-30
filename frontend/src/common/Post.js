import React from 'react'
import { getMusicalEntityBoxComponent } from '../Common/Utilities'
const Post = ({post}) => {
  const musicalEntityComponent = getMusicalEntityBoxComponent(post.MusicalEntity)
  return (
    <div className='post content'>
      <div className='left'>
        <div>
            {post.User.FirstName} {post.User.LastName}
        </div>
        <div className='posttext'>
            <div className='posttitle'>
              {post.Title}
            </div>
            <div>
              {post.Content}
            </div>
        </div>
      </div>

      <div>
        {musicalEntityComponent}
      </div>
    </div>
  )
}

export default Post