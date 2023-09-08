import React, { useState } from 'react';
import { useCookies } from 'react-cookie'
import { addFriendshipBetweenUsers } from '../Common/ServerFunctions/FriendsFunctions';
import { removeFriendRequest } from '../Common/ServerFunctions/FriendsRequestsFunctions';

const FriendsRequestsDisplay = ({ friendsRequests }) => {
  const [ friendsRequestsItems, setFriendsRequestsItems ] = useState(friendsRequests);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  const handleAccept = async (friendRequest, index) => {
    setFriendsRequestsItems(friendsRequestsItems.filter((friendRequest, i) => i !== index));
    await addFriendshipBetweenUsers(userId, friendRequest.userId);
    await removeFriendRequest(friendRequest.userId, userId);
  }

  const handleDecline = async (friendRequest, index) => {
    setFriendsRequestsItems(friendsRequestsItems.filter((friendRequest, i) => i !== index));
    await removeFriendRequest(friendRequest.userId, userId);
  }

  return (
    friendsRequests.length > 0 ?
    <div> These are your friends Requests: <br />
      {
        friendsRequestsItems.map((friendRequest, index) =>
        <div className='friendsRequestsDisplayContainer'>
          <div>
            {friendRequest.firstName} {friendRequest.lastName}
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