import React, { useState } from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Song = ({song, liked, onLiked, onDisliked}) => {
    const [isLiked, setIsLiked] = useState(liked);
    const navigate = useNavigate();
    const handleLike = (event) => {
        event.preventDefault();
        onLiked(song._id)
        setIsLiked(true);
    }

    const handleDislike = (event) => {
        event.preventDefault();
        onDisliked(song._id);
        setIsLiked(false);
    }

  return (
    <div>
      <h1>name: {song.Name} </h1>
      <h2>album: {song.album.Name}</h2>
      <h2>artist: {song.artist.Name}</h2>
      {isLiked ?
        <div onClick={handleDislike}>([]V)</div>
      : <div onClick={handleLike}>([]^) </div>
      }
      <Button text="new post" onClick={()=>{
              navigate(`/newpost?type=song&id=${song._id}`)
      }} />
    </div>
  )
}

export default Song