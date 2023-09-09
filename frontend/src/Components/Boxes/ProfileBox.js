import React from 'react'
import { useState } from 'react';
import Link from '../Link';

const ProfileBox = ({profile, sendFriendRequest, removeFriendRequest}) => {
  const [friendRequestSent, setFriendRequestSent] = useState(profile.isFriendRequestSent);

  const handleSendRequst = async () => {
    try {
      setFriendRequestSent(true);
      sendFriendRequest(profile.userId)
    } catch {
      setFriendRequestSent(false);
    }
  }

  const handleRemoveRequst = async () => {
    try {
      setFriendRequestSent(false);
      removeFriendRequest(profile.userId)
    } catch {
      setFriendRequestSent(true);
    }
  }

  return (
      <div className='profile-box' style={{width:"max-content"}}>
        {
          profile.imageUrl &&
          <span className='user' style={{width:"6rem", height:"6rem"}}>
            <img src={profile.imageUrl}/>
          </span>
        }
        <div>
          <span style={{color:'grey'}}>user</span>
          <Link text={`${profile.firstName} ${profile.lastName}`} url={`/user/${profile.userId}`} />
        </div>
        {
          sendFriendRequest && removeFriendRequest && (
            friendRequestSent ?
              <button id='addFriend' onClick={handleRemoveRequst}>Remove friend request</button>
            :
              <button id='addFriend' onClick={handleSendRequst}>Send friend request</button>
          )
        }
      </div>
  )
}

export default ProfileBox