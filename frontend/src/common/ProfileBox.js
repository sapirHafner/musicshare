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
      <div onClick={onClickBox} style={{cursor: 'pointer'}}>
        {firstName} {lastName}  (-) 
      </div>
    ) :
    (
      <div onClick={onClickBox} style={{cursor: 'pointer'}}>
        {firstName} {lastName}  (+) 
      </div>
    )
    
  )
}

export default ProfileBox