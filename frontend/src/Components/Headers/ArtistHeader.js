import React from 'react'

import FollowersButton from '../Buttons/FollowersButton'
import LikeButton from '../Buttons/LikeButton';
import ShareButton from '../Buttons/ShareButton'

const ArtistHeader = ({ artist, onLike, onDislike, onFollow, onUnfollow, onShare }) => {
  return (
    <div className='content header'>
      <div>
        <div className='header-type'>
          artist
        </div>
        <div>
          {artist.name}
        </div>
      </div>
      <div className='functions'>
        {onLike && onDislike && (
          <LikeButton
            isLiked={artist.liked}
            onLike={onLike}
            onDislike={onDislike}
            likesNumber={artist.likesNumber}
          />
        )}
        {onFollow && onUnfollow && (
          <FollowersButton
            isFollowed={artist.followed}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
          />
        )}
        {
          onShare &&
            <ShareButton id={artist._id}  onShare={onShare}/>
        }
      </div>
    </div>
  )
}

export default ArtistHeader
