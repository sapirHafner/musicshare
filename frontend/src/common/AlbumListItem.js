import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { addAlbumLike, removeAlbumLike } from '../ServerFunctions/likesFunctions';
import LikeButton from '../Components/LikeButton/LikeButton';
import ShareButton from '../Components/ShareButton/ShareButton';
import Link from '../Components/Link/Link';

const AlbumListItem = ({album}) => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const [isLiked, setIsLiked] = useState(album.liked);

  const onLike = () => {
    const handleLike = async () => {
      try {
        setIsLiked(true);
        await addAlbumLike(userId, album._id);
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
        await removeAlbumLike(userId, album._id);
      } catch (error) {
        setIsLiked(true);
      }
    };
    handleDislike();
  }

  return (
    <div className='listitem album'>
      <div className='details'>
        <div className='boximage'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div>
          <Link text={album.Name} url={`/album/${album._id}`} />
          <Link text={album.artist.Name} url={`/artist/${album.artist._id}`} />
        </div>
      </div>
      <div className='functions'>
        <LikeButton isLiked={isLiked} onLike={onLike} onDislike={onDislike}/>
        <ShareButton type="album" id={album._id} />
      </div>
    </div>
  )
}

export default AlbumListItem;