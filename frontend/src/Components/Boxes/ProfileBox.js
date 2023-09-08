import React from 'react'
import { useState, useEffect } from 'react';

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
      <div className='friendsRequestsDisplayContainer'>
        <div>{profile.firstName} {profile.lastName}</div>
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