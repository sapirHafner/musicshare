import React, { useState, useEffect } from 'react';
import { removeFriendRequestFromDB } from '../ServerFunctions/FriendsFunctions';

const FriendsRequestsDisplay = ({ friendsRequests }) => {
  
  const handleAccept = index => {
    setList(newList.filter((friendRequest,i) => i !== index));
    
  }

  const handleDecline= index => {
    setList(newList.filter((friendRequest,i) => i !== index));
  }
 
  const friendsRequestsList = friendsRequests.map((friendRequest, index) => {
   return(
     <div className='friendsRequestsDisplayContainer'>
      <div>        
        {friendRequest.FirstName} {friendRequest.LastName} </div>
      
      <button id='accept' onClick={() => handleAccept(index)}>Accept</button> 
      <button id='decline' onClick={() => handleDecline(index)}>Decline</button>
      </div>)
  });

  const [newList, setList] = React.useState(friendsRequestsList);

  useEffect(() => {
    console.log(newList);
  }, [newList]);

  return (
    <div> These are your friends Requests: <br />
      {newList}
    </div>
  )
}

export default FriendsRequestsDisplay;