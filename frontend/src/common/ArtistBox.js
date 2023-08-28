import React from 'react'
import thumbsUpIcon from '../Images/thumbs-up-icon.png'
import thumbsDownIcon from '../Images/thumbs-down-icon.png'
import shareIcon from '../Images/share-icon.png'
import { useState } from 'react'
import { useNavigate
 } from 'react-router-dom'


const ArtistBox = ({name}) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='musicalentity'>
    <div className='top'>
      <div className='left'>
        <div className='music-image'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div className='details'>
          <h1>{name} </h1>
        </div>
      </div>
    </div>
    <div className='bottom'>
      {isLiked ?
        <span onClick={() => {}}><img class='icon' src={thumbsDownIcon}/></span>
      : <span onClick={() => {}}><img class='icon' src={thumbsUpIcon}/></span>
      }
      <span onClick={()=>{navigate(`/newpost?type=artist&id=${''}`)}}><img class='icon' src={shareIcon}/></span>
    </div>
  </div>
  )
}

export default ArtistBox