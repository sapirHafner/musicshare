import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import thumbsUpIcon from '../Images/thumbs-up-icon.png'
import thumbsDownIcon from '../Images/thumbs-down-icon.png'
import shareIcon from '../Images/share-icon.png'
import { useCookies } from 'react-cookie';
import { addUserLike, removeUserLike } from '../ServerFunctions/likesFunctions';

const AlbumListItem = ({album}) => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const [isLiked, setIsLiked] = useState(album.liked);
  const navigate = useNavigate();

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

  return (
    <div className='listitem album'>
      <div className='details'>
        <div className='boximage'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div>
          <div className='link'>{album.Name}</div>
          <div className='link' onClick={()=>{navigate(`/artist/${album.artist._id}`)}}>{album.artist.Name}</div>
        </div>
      </div>
      <div className='functions'>
        {isLiked ?
          <span onClick={handleDislike} className='clickable'><img class='icon' src={thumbsDownIcon}/></span>
        : <span onClick={handleLike} className='clickable'><img class='icon' src={thumbsUpIcon}/></span>
        }
        <span className='clickable' onClick={()=>{navigate(`/newpost?type=album&id=${album._id}`)}}><img class='icon' src={shareIcon}/></span>
      </div>
    </div>
  )
}

export default AlbumListItem;