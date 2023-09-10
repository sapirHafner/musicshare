import React from 'react'
import { useState } from 'react';
import Link from '../Link';
import friendsIcon from '../../Assets/Icons/friends-icon.png'

const ProfileBox = ({profile, sendFriendRequest, removeFriendRequest, acceptFriendRequest, declineFriendRequest}) => {
  const [friendRequestSent, setFriendRequestSent] = useState(profile.isFriendRequestSent);
  const [friendRequestReceived, setFriendRequestReceived] = useState(profile.isFriendRequestReceived);
  const [isFriend, setIsFriend] = useState(profile.isFriend)

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

  const handleAcceptRequest = async () => {
    try {
      setIsFriend(true);
      setFriendRequestReceived(false)
      acceptFriendRequest(profile.userId)
    } catch {
      setIsFriend(true);
      setFriendRequestReceived(true)
    }
  }

  const handleDeclineRequest = async () => {
    try {
      setFriendRequestReceived(false)
      declineFriendRequest(profile.userId)
    } catch {
      setFriendRequestReceived(true)
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
          <Link text={`${profile.firstName} ${profile.lastName}`} url={`/library/${profile.userId}`} />
        </div>
        {
          sendFriendRequest && removeFriendRequest && !friendRequestReceived && !isFriend && (
            friendRequestSent ?
              <button id='addFriend' onClick={handleRemoveRequst}>Remove friend request</button>
            :
              <button id='addFriend' onClick={handleSendRequst}>Send friend request</button>
          )
        }
        {
          acceptFriendRequest && declineFriendRequest && friendRequestReceived &&
          <div>
            <button id='accept' onClick={handleAcceptRequest}>Accept</button>
            <button id='decline' onClick={handleDeclineRequest}>Decline</button>
          </div>
        }
        {
          isFriend && <img className='icon' src={friendsIcon} />
        }
      </div>
  )
}

export default ProfileBox