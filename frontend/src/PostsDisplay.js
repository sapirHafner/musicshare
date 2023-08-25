import React from 'react'
import Post from './Post'

const PostsDisplay = ({posts}) => {
  console.log(posts)
  const postsComponents = posts.map(post =>
      <Post
        title={post.title}
        content={post.content}
        />
    )
  return (
    <div>
        {postsComponents}
    </div>
  )
}

export default PostsDisplay;