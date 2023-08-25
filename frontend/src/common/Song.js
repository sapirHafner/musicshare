import React, { useState } from 'react'
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const Song = ({id, name, artist, album, liked, onLiked, onDisliked}) => {
    const [isLiked, setIsLiked] = useState(liked);
    const navigate = useNavigate();

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
      <Button text="new post" onClick={()=>{
              navigate(`/newpost?type=song&id=${id}`)
      }} />
    </div>
  )
}

export default Song