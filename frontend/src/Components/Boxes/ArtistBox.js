import React from 'react'
import LikeButton from '../Buttons/LikeButton'
import ShareButton from '../Buttons/ShareButton'
import FollowersButton from '../Buttons/FollowersButton'
import Link from '../Link'

const ArtistBox = ({artist, onLike, onDislike, onFollow, onUnfollow}) => {
  return (
  <div className='musicalentity artistbox box'>
    <div className='details'>
      <div className='boximage'>
        <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
      </div>
      <div>
        <Link text={artist.name} url={`/artist/${artist._id}`} />
      </div>
    </div>
    <div className='boxfunctions'>
      {
        onLike && onDislike &&
          <LikeButton isLiked={artist.liked} onLike={onLike} onDislike={onDislike} likesNumber={artist.likesNumber}/>
      }
      {
        onFollow && onUnfollow &&
        <FollowersButton isFollowed={artist.followed} onFollow={onFollow} onUnfollow={onUnfollow}/>
      }
      <ShareButton type="artist" id={artist._id} />
    </div>
  </div>
  )
}

export default ArtistBox