import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import thumbsUpIcon from '../Images/thumbs-up-icon.png'
import thumbsDownIcon from '../Images/thumbs-down-icon.png'
import shareIcon from '../Images/share-icon.png'
import { useCookies } from 'react-cookie';
import { addUserLike, removeUserLike } from '../ServerFunctions/likesFunctions';

const ArtistListItem = ({artist}) => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const [isLiked, setIsLiked] = useState(artist.liked);
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
    <div className='listitem artist'>
      <div className='details'>
        <div className='boximage'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div className='artistName link' onClick={()=>{navigate(`/artist/${artist._id}`)}}>
          {artist.Name}
        </div>
      </div>
      <div className='functions'>
        {isLiked ?
          <span onClick={handleDislike} className='clickable'><img class='icon' src={thumbsDownIcon}/></span>
        : <span onClick={handleLike} className='clickable'><img class='icon' src={thumbsUpIcon}/></span>
        }
        <span className='clickable' onClick={()=>{navigate(`/newpost?type=artist&id=${artist._id}`)}}><img class='icon' src={shareIcon}/></span>
      </div>
    </div>
  )
}

export default ArtistListItem;