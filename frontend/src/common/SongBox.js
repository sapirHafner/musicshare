import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import thumbsUpIcon from '../Images/thumbs-up-icon.png'
import thumbsDownIcon from '../Images/thumbs-down-icon.png'
import shareIcon from '../Images/share-icon.png'
import { useCookies } from 'react-cookie';
import { addUserLike, removeUserLike } from '../ServerFunctions/likesFunctions';

const SongBox = ({song}) => {
    const [cookies] = useCookies(['userId']);
    const { userId } = cookies;
    const [isLiked, setIsLiked] = useState(song.liked);
    const navigate = useNavigate();

    const handleLike = (event) => {
      const onLike = async () => {
        event.preventDefault();
        await addUserLike(userId, {
          Type: "song",
          Id: song._id,
        });
        setIsLiked(true);
      };
      onLike();
    }

    const handleDislike = (event) => {
      const onDisike = async () => {
        event.preventDefault();
        await removeUserLike(userId, {
          Type: "song",
          Id: song._id,
        });
        setIsLiked(false);
      };
      onDisike();
    }

  return (
    <div className='musicalentity'>
      <div className='details'>
        <div className='boximage'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div>
          {song.Name} <br />
          {song.artist.Name} <br/>
          <span className='albumName'>{song.album.Name}</span>
        </div>
      </div>
      <div>
        {isLiked ?
          <span onClick={handleDislike}><img class='icon' src={thumbsDownIcon}/></span>
        : <span onClick={handleLike}><img class='icon' src={thumbsUpIcon}/></span>
        }
        <span onClick={()=>{navigate(`/newpost?type=song&id=${song._id}`)}}><img class='icon' src={shareIcon}/></span>
      </div>
    </div>
  )
}

export default SongBox