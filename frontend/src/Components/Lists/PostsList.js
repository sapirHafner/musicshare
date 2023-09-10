import React from 'react'
import Post from '../Post'

const PostsList= ({posts, onLike, onDislike, onFollow, onUnfollow, onShare}) => {
  return (
    <div>
        {posts && posts.map(post => <Post post={post} onLike={onLike} onDislike={onDislike} onFollow={onFollow} onUnfollow={onUnfollow} onShare={onShare}/>)}
    </div>
  )
}

export default PostsList;