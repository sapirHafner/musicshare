import React from 'react'
import { getMusicalEntityBoxComponent } from '../Common/Utilities'
import ProfileBox from './Boxes/ProfileBox'
import ArtistBox from './Boxes/ArtistBox'

const Post = ({post}) => {
  const musicalEntityComponent = getMusicalEntityBoxComponent(post.musicalEntity)
  return (
    <div className='post content'>
      <div className='left'>
        <div className='post-box' >
            {
              post.user.userType === "artist" ?
                <ArtistBox artist={post.user.info} />
              : <ProfileBox profile={post.user.info}/>
            }
        </div>
        <div className='posttext' style={{"max-width":"30rem", "margin-left":"2rem", "margin-right":"2rem"}}>
            <div className='posttitle'>
              <h5>{post.title}</h5>
            </div>
            <div style={{textAlign:"left"}}>
            <i>
              {post.content}
            </i>
            </div>
        </div>
      </div>

      <div className='component'>
        {musicalEntityComponent}
      </div>
    </div>
  )
}

export default Post