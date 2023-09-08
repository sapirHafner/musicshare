import React, { useState } from 'react'

import Link from '../../Link';

import LikeButton from '../../Buttons/LikeButton'
import ShareButton from '../../Buttons/ShareButton'
import FollowersButton from '../../Buttons/FollowersButton'

const ArtistListItem = ({ artist, onLike, onDislike, onFollow, onUnfollow }) => {
  return (
    <div className='listitem artist'>
      <div className='details'>
        <div className='boximage'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <span className='artistName'>
          <Link text={artist.name} url={`/artist/${artist._id}`} />
        </span>
      </div>
      <div className='functions'>
      {
        onLike && onDislike &&
        <LikeButton id={artist._id} isLiked={artist.liked} onLike={onLike} onDislike={onDislike} likesNumber={artist.likesNumber}/>
      }
      {
        onFollow && onUnfollow &&
        <FollowersButton id={artist._id} isFollowed={artist.followed} onFollow={onFollow} onUnfollow={onUnfollow}/>
      }
        <ShareButton type="artist" id={artist._id} />
      </div>
    </div>
  )
}

export default ArtistListItem;