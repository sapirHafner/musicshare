import React from 'react'
import thumbsUpIcon from '../Images/thumbs-up-icon.png'
import thumbsDownIcon from '../Images/thumbs-down-icon.png'
import shareIcon from '../Images/share-icon.png'
import { useState } from 'react'
import { useNavigate
 } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { addUserLike, removeUserLike } from '../ServerFunctions/likesFunctions'


const ArtistBox = ({artist}) => {
  const [isLiked, setIsLiked] = useState(artist.liked);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const navigate = useNavigate();

  const handleLike = (event) => {
    const onLike = async () => {
      event.preventDefault();
      await addUserLike(userId, {
        Type: "artist",
        Id: artist._id,
      });
      setIsLiked(true);
    };
    onLike();
}

const handleDislike = (event) => {
  const onDisike = async () => {
    event.preventDefault();
    await removeUserLike(userId, {
      Type: "artist",
      Id: artist._id,
    });
    setIsLiked(false);
  };
  onDisike();
}

  return (
    <div className='musicalentity'>
    <div className='top'>
      <div className='left'>
        <div className='music-image'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div className='details'>
          <h1>{artist.Name}</h1>
        </div>
      </div>
    </div>
    <div className='bottom'>
      {isLiked ?
        <span onClick={handleDislike}><img class='icon' src={thumbsDownIcon}/></span>
      : <span onClick={handleLike}><img class='icon' src={thumbsUpIcon}/></span>
      }
      <span onClick={()=>{navigate(`/newpost?type=artist&id=${artist._id}`)}}><img class='icon' src={shareIcon}/></span>
    </div>
  </div>
  )
}

export default ArtistBox