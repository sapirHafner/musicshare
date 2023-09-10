import React from 'react'
import Post from '../Post'

const PostsList= ({posts}) => {
  return (
    <div>
        {posts && posts.map(post => <Post post={post}/>)}
    </div>
  )
}

export default PostsList;