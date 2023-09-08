import React from 'react'
import Post from '../Post'

const PostsList= ({posts}) => {
  console.log(posts)
  const postsComponents = posts.map(post => <Post post={post}/>)
  return (
    <div>
        {postsComponents}
    </div>
  )
}

export default PostsList;