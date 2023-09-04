import React, { useState } from 'react';

const FriendsRequestsDisplay = ({ friendsRequests }) => {
  const [ friendsRequestsItems, setFriendsRequestsItems ] = useState(friendsRequests);

  const handleAccept = (friendRequest, index) => {
  }

  const handleDecline= (friendRequest, index) => {
  }

  return (
    friendsRequests.length > 0 ?
    <div> These are your friends Requests: <br />
      {
        friendsRequestsItems.map((friendRequest, index) =>
        <div className='friendsRequestsDisplayContainer'>
          <div>
            {friendRequest.FirstName} {friendRequest.LastName}
          </div>
          <button id='accept' onClick={() => handleAccept(friendRequest, index)}>Accept</button>
          <button id='decline' onClick={() => handleDecline(friendRequest, index)}>Decline</button>
        </div>)
      }
    </div>
    :
    <p>No new friend requests</p>
  )
}

export default FriendsRequestsDisplay;