import React from 'react'
import { getMusicalEntityBoxComponent } from '../Common/Utilities'
import ProfileBox from './Boxes/ProfileBox'

const Post = ({post}) => {
  const musicalEntityComponent = getMusicalEntityBoxComponent(post.musicalEntity)
  return (
    <div className='post content'>
      <div className='left'>
        <div className='box'>
            {
              post.user.userType === "artist" ?
                post.user.info.name
              : <ProfileBox profile={post.user.info}/>
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