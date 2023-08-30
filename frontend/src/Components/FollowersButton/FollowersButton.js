import React from 'react'
import followIcon from './follow-icon.png'
import unfollowIcon from './unfollow-icon.png'

const FollowersButton = ({isFollowed, onFollow, onUnfollow}) => {
  return (
    <span className='clickable'>
      {isFollowed ? (
        <img className='icon' src={unfollowIcon} onClick={onUnfollow} />
      ) : (
        <img className='icon' src={followIcon} onClick={onFollow} />
      )}
    </span>
  )
}

export default FollowersButton