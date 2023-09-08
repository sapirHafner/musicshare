import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { addSongLike, removeSongLike } from '../../../Common/ServerFunctions/likesFunctions';
import LikeButton from '../../Buttons/LikeButton';
import ShareButton from '../../Buttons/ShareButton';
import Link from '../../Link'

const SongListItem = ({song}) => {
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
    <div className='listitem'>
      <div className='details'>
          <div className='boximage'>
            <img src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
          </div>
          <div>
            {song.name}
            <Link text={song.artist.name} url={`/artist/${song.artist._id}`} />
          </div>
      </div>
      <span className='albumName'>
        <Link text={song.album.name} url={`/album/${song.album._id}`} />
      </span>
      <div className='functions'>
        <LikeButton isLiked={isLiked} onLike={onLike} onDislike={onDislike} likesNumber ={song.likesNumber} />
        <ShareButton type="song" id={song._id} />
      </div>
    </div>
  )
}

export default SongListItem