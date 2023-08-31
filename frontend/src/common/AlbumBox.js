import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { addAlbumLike, removeAlbumLike } from '../ServerFunctions/likesFunctions'
import LikeButton from '../Components/LikeButton/LikeButton'
import ShareButton from '../Components/ShareButton/ShareButton'
import Link from '../Components/Link/Link'

const AlbumBox = ({album, className}) => {

  const [isLiked, setIsLiked] = useState(album.liked);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
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
    className === "min" ?
      <div className='box'>
        <div className='boximage' >
          <img src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <span className='name'>
          <Link text={album.Name} url={`/album/${album._id}`} />
        </span>
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
        <LikeButton isLiked={isLiked} onLike={onLike} onDislike={onDislike} likesNumber={album.likesNumber}/>
        <ShareButton type="album" id={album._id} />
      </div>
    </div>
  )
}

export default AlbumBox

