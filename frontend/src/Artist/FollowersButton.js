import React from 'react'
import followIcon from '../Images/follow-icon.png'

const FollowersButton = () => {
  return (
    <span className='clickable'>
        <img class='icon' src={followIcon}/>
    </span>
  )
}

export default FollowersButton