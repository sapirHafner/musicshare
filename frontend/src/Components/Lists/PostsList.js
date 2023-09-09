import React from 'react'
import Post from '../Post'

const PostsList= ({posts}) => {
  console.log(posts)
  return (
    <div>
        {posts.map(post => <Post post={post}/>)}
    </div>
  )
}

export default PostsList;