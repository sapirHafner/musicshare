import React from 'react'
import Post from './Post'

const PostsDisplay = ({posts}) => {
  const postsComponents = posts.map(post =>
      <Post
        title={post.Title}
        content={post.Content}
        musicalObject={post.MusicalObject}
        user={post.User}
        />
    )
  return (
    <div>
        {postsComponents}
    </div>
  )
}

export default PostsDisplay;