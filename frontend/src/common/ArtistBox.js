import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { addArtistLike, removeArtistLike } from '../ServerFunctions/likesFunctions'
import LikeButton from '../Components/LikeButton/LikeButton'
import ShareButton from '../Components/ShareButton/ShareButton'

const ArtistBox = ({artist}) => {
  const [isLiked, setIsLiked] = useState(artist.liked);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  const onLike = () => {
    const handleLike = async () => {
      try {
        setIsLiked(true);
        await addArtistLike(userId, artist._id);
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
        await removeArtistLike(userId, artist._id);
      } catch (error) {
        setIsLiked(true);
      }
    };
    handleDislike();
  }


  return (
  <div className='musicalentity artistbox box'>
    <div className='details'>
      <div className='boximage'>
        <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
      </div>
      <div>
        <br/>
        {artist.Name}
      </div>
    </div>
    <div className='boxfunctions'>
      <LikeButton isLiked={isLiked} onLike={onLike} onDislike={onDislike}/>
      <ShareButton type="artist" id={artist._id} />
    </div>
  </div>
  )
}

export default ArtistBox