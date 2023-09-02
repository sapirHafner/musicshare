import React from 'react'
import followIcon from './follow-icon.png'
import unfollowIcon from './unfollow-icon.png'
import { useCookies } from 'react-cookie'

const FollowersButton = ({isFollowed, onFollow, onUnfollow}) => {
  const [cookies] = useCookies(['userType']);
  const { userType } = cookies;
  if (userType !== 'user') {
    return (<></>)
  }

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