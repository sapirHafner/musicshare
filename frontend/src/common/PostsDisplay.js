import React from 'react'
import Post from './Post'

const PostsDisplay = ({posts}) => {
  const postsComponents = posts.map(post => <Post post={post}/>)
  return (
    <div>
        {postsComponents}
    </div>
  )
}

export default PostsDisplay;