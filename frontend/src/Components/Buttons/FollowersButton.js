import React, { useState } from 'react'
import followIcon from '../../Assets/Icons/follow-icon.png'
import unfollowIcon from '../../Assets/Icons/unfollow-icon.png'

const FollowersButton = ({id, isFollowed, onFollow, onUnfollow}) => {
  const [followed, setFollowed] = useState(isFollowed);
  const handleFollow = () => {
    try {
      setFollowed(true);
      onFollow(id);
    } catch (error) {
      setFollowed(false);
    }
  }

  const handleUnfollow = () => {
    try {
      setFollowed(false);
      onUnfollow(id);
    } catch (error) {
      setFollowed(true);
    }
  }
  return (
    <span className='clickable'>
      {followed ? (
        <img className='icon' src={unfollowIcon} onClick={handleUnfollow} />
      ) : (
        <img className='icon' src={followIcon} onClick={handleFollow} />
      )}
    </span>
  )
}

export default FollowersButton