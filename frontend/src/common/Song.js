import React, { useState } from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Song = ({song, onLiked, onDisliked}) => {
    const [isLiked, setIsLiked] = useState(song.liked);
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
    <div className='song'>
      <div className='left'>
        <h1>{song.Name} </h1>
        <h3>{song.artist.Name}</h3>
      </div>
      <div className='middle'>
        <h2>{song.album.Name}</h2>
      </div>
      <div className='bottom'>
        {isLiked ?
          <div onClick={handleDislike}>([]V)</div>
        : <div onClick={handleLike}>([]^) </div>
        }
        <Button text="new post" onClick={()=>{
                navigate(`/newpost?type=song&id=${song._id}`)
        }} />
      </div>

    </div>
  )
}

export default Song