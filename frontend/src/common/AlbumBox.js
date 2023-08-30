import React from 'react'
import thumbsUpIcon from '../Images/thumbs-up-icon.png'
import thumbsDownIcon from '../Images/thumbs-down-icon.png'
import shareIcon from '../Images/share-icon.png'
import { useState } from 'react'
import { useNavigate
 } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { addUserLike, removeUserLike } from '../ServerFunctions/likesFunctions'

const AlbumBox = ({album, className}) => {
  const [isLiked, setIsLiked] = useState(album.liked);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const handleLike = (event) => {
    const onLike = async () => {
      event.preventDefault();
      await addUserLike(userId, {
        Type: "album",
        Id: album._id,
      });
      setIsLiked(true);
    };
    onLike();
}

const handleDislike = (event) => {
  const onDisike = async () => {
    event.preventDefault();
    await removeUserLike(userId, {
      Type: "album",
      Id: album._id,
    });
    setIsLiked(false);
  };
  onDisike();
}

  const navigate = useNavigate();
  return (
    className === "min" ?
      <div className='box'>
        <div className='boximage'>
          <img src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div className='name link'>
          {album.Name}
        </div>
      </div>
    :
    <div className='musicalentity'>
      <div className='details'>
        <div className='boximage'>
          <img src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div>
          {album.Name} <br />
          {album.artist.Name} <br />
        </div>
      </div>
      <div>
        {isLiked ?
          <span onClick={handleDislike}><img class='icon' src={thumbsDownIcon}/></span>
          : <span onClick={handleLike}><img class='icon' src={thumbsUpIcon}/></span>
        }
        <span onClick={()=>{navigate(`/newpost?type=album&id=${album._id}`)}}><img class='icon' src={shareIcon}/></span>
      </div>
    </div>
  )
}

export default AlbumBox

