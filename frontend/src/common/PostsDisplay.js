import React from 'react'
import Post from './Post'

const PostsDisplay = ({posts}) => {
  const postsComponents = posts.map(post =>
      <Post
        title={post.Title}
        content={post.Content}
        musicalEntity={post.MusicalEntity}
        user={post.User}
        />
    )
  return (
    <div>
        <h4>your posts:</h4>
        {postsComponents}
    </div>
  )
}

export default PostsDisplay;