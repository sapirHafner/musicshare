import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { addSongLike, removeSongLike } from '../ServerFunctions/likesFunctions';
import LikeButton from '../Components/LikeButton/LikeButton';
import ShareButton from '../Components/ShareButton/ShareButton'

const SongBox = ({song, className}) => {
    const [cookies] = useCookies(['userId']);
    const { userId } = cookies;
    const [isLiked, setIsLiked] = useState(song.liked);

    const onLike = () => {
      const handleLike = async () => {
        try {
          setIsLiked(true);
          await addSongLike(userId, song._id);
        } catch (error) {
          setIsLiked(false);
        }
      };
      handleLike();
    }

    const onDislike = () => {
      const handleDislike = async () => {
        try {
          setIsLiked(false);
          await removeSongLike(userId, song._id);
        } catch (error) {
          setIsLiked(true);
        }
      };
      handleDislike();
    }

  return (
    <div className='musicalentity box'>
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
      <div className="functions">
        <LikeButton isLiked={isLiked} onLike={onLike} onDislike={onDislike}/>
        <ShareButton type="song" id={song._id} />
      </div>
    </div>
  )
}

export default SongBox