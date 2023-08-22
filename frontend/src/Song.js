import React, { useState } from 'react'

const Song = ({id, name, artist, album, liked, onLiked, onDisliked}) => {
    const [isLiked, setIsLiked] = useState(liked);
    const handleLike = (event) => {
        event.preventDefault();
        onLiked(id)
        setIsLiked(true);
    }

    const handleDislike = (event) => {
        event.preventDefault();
        onDisliked(id);
        setIsLiked(false);
    }

  return (
    <div>
      <h1>name: {name} </h1>
      <h2>album: {album}</h2>
      <h2>artist: {artist}</h2>
      {isLiked ?
        <div onClick={handleDislike}>([]V)</div>
      : <div onClick={handleLike}>([]^) </div>
      }
    </div>
  )
}

export default Song