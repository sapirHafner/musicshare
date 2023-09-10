import React from 'react'
import LikeButton from '../Buttons/LikeButton'
import ShareButton from '../Buttons/ShareButton'
import FollowersButton from '../Buttons/FollowersButton'
import Link from '../Link'

const ArtistBox = ({ artist, onLike, onDislike, onFollow, onUnfollow, onShare }) => {
  return (
  <div className='musicalentity box profile-box' style={{width:"15rem"}}>
    <div className='details'>
      {
        artist.imageUrl &&
        <span className='user' style={{width:"6rem", height:"6rem"}}>
          <img src={artist.imageUrl}/>
        </span>
      }
      <div>
        <span style={{color:'grey'}}>artist</span>
        <Link text={artist.name} url={`/artist/${artist._id}`} />
      </div>
    </div>
      {
        onLike && onDislike &&
          <LikeButton isLiked={artist.liked} onLike={onLike} onDislike={onDislike} likesNumber={artist.likesNumber}/>
      }
      {
        onFollow && onUnfollow &&
        <FollowersButton isFollowed={artist.followed} onFollow={onFollow} onUnfollow={onUnfollow}/>
      }
      {
        onShare &&
          <ShareButton id={artist._id} onShare={onShare} />
      }
  </div>
  )
}

export default ArtistBox

