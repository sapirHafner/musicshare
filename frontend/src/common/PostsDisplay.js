import React from 'react'
import Post from './Post'

const PostsDisplay = ({posts}) => {
  const postsComponents = posts.map(post =>
      <Post
        title={post.title}
        content={post.content}
        musicalObject={post.musicalObject}
        user={post.user}
        />
    )
  return (
    <div>
        {postsComponents}
    </div>
  )
}

export default PostsDisplay;