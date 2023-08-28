import React, { useState } from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import thumbsUpIcon from '../Images/thumbs-up-icon.png'
import thumbsDownIcon from '../Images/thumbs-down-icon.png'
import shareIcon from '../Images/share-icon.png'


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
      <div className='top'>
        <div className='left'>
          <div className='album-image'>
            <img class='albumimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
          </div>
          <div className='details'>
            <h1>{song.Name} </h1>
            <h3>{song.artist.Name}</h3>
          </div>
        </div>
        <div className='middle'>
          <h2>{song.album.Name}</h2>
        </div>
        <div className='right'>
          3:43
        </div>
      </div>
      <div className='bottom'>
        {isLiked ?
          <span onClick={handleDislike}><img class='icon' src={thumbsDownIcon}/></span>
        : <span onClick={handleLike}><img class='icon' src={thumbsUpIcon}/></span>
        }
        <span onClick={()=>{navigate(`/newpost?type=song&id=${song._id}`)}}><img class='icon' src={shareIcon}/></span>
      </div>

    </div>
  )
}

export default Song