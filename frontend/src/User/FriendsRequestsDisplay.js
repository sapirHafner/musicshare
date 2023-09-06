import React, { useState } from 'react';
import { useCookies } from 'react-cookie'
import { addFriendshipBetweenUsers, removeFriendRequestFromDB } from '../ServerFunctions/FriendsFunctions';

const FriendsRequestsDisplay = ({ friendsRequests }) => {
  const [ friendsRequestsItems, setFriendsRequestsItems ] = useState(friendsRequests);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  const handleAccept = async (friendRequest, index) => {
    setFriendsRequestsItems(friendsRequestsItems.filter((friendRequest, i) => i !== index));
    await addFriendshipBetweenUsers(userId, friendRequest.UserId);
    await removeFriendRequestFromDB(friendRequest.UserId, userId);
  }

  const handleDecline = async (friendRequest, index) => {
    setFriendsRequestsItems(friendsRequestsItems.filter((friendRequest, i) => i !== index));
    await removeFriendRequestFromDB(friendRequest.UserId, userId);
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