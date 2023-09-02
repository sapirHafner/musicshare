import React from 'react'
import { getMusicalEntityBoxComponent } from '../Common/Utilities'
const Post = ({post}) => {
  console.log("###")
  console.log(post)
  const musicalEntityComponent = getMusicalEntityBoxComponent(post.MusicalEntity)
  return (
    <div className='post content'>
      <div className='left'>
        <div className='box'>
            {
              post.User.userType === "artist" ?
                post.User.info.Name
              : (<>{post.User.info.FirstName} {post.User.info.LastName}</>)
            }
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