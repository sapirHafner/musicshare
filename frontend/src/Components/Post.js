import React from 'react'
import { getMusicalEntityBoxComponent } from '../Common/Utilities'
const Post = ({post}) => {
  const musicalEntityComponent = getMusicalEntityBoxComponent(post.musicalEntity)
  return (
    <div className='post content'>
      <div className='left'>
        <div className='box'>
            {
              post.user.userType === "artist" ?
                post.user.info.name
              : (<>{post.user.info.firstName} {post.user.info.lastName}</>)
            }
        </div>
        <div className='posttext'>
            <div className='posttitle'>
              {post.title}
            </div>
            <div>
              {post.content}
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