import React from 'react'
import { useState, useEffect } from 'react';

const ProfileBox = ({myId, userId, firstName, lastName, sendRequest}) => {
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const onClickBox = () => {
    if(!friendRequestSent){
      sendRequest(myId, userId);
    }
    setFriendRequestSent(!friendRequestSent);

  };
  return (
    friendRequestSent === true ? (
      <div className='friendsRequestsDisplayContainer'>
        <div>{firstName} {lastName}</div>
        <button id='addFriend' onClick={onClickBox}>Remove friend request</button> 
      </div>
    ) :
    (
      <div className='friendsRequestsDisplayContainer'>
        <div>{firstName} {lastName}</div>
        <button id='addFriend' onClick={onClickBox}>Add friend!</button> 
      </div>
    )

  )
}

export default ProfileBox