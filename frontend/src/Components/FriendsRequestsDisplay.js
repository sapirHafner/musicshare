import React, { useState } from 'react';
import { useCookies } from 'react-cookie'
import { addFriendshipBetweenUsers } from '../Common/ServerFunctions/FriendsFunctions';
import { removeFriendRequest } from '../Common/ServerFunctions/FriendsRequestsFunctions';
import ProfileBox from '../Components/Boxes/ProfileBox';

const FriendsRequestsDisplay = ({ friendsRequests }) => {
  const [ friendsRequestsItems, setFriendsRequestsItems ] = useState(friendsRequests);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  const handleAccept = async (index) => {
    const friendRequest = friendsRequestsItems[index]
    setFriendsRequestsItems(friendsRequestsItems.filter((friendRequest, i) => i !== index));
    await addFriendshipBetweenUsers(userId, friendRequest.userId);
    await removeFriendRequest(friendRequest.userId, userId);
  }

  const handleDecline = async (index) => {
    const friendRequest = friendsRequestsItems[index]
    setFriendsRequestsItems(friendsRequestsItems.filter((friendRequest, i) => i !== index));
    await removeFriendRequest(friendRequest.userId, userId);
  }

  return (
    friendsRequests.length > 0 ?
    <div> These are your friends Requests: <br />
      {
        friendsRequestsItems.map((friendRequest, index) =>
        <div className='friendsRequestsDisplayContainer'>
          <ProfileBox
            id={index}
            profile={friendRequest}
            acceptFriendRequest={handleAccept}
            declineFriendRequest={handleDecline} />
        </div>)
      }
    </div>
    :
    <p>No new friend requests</p>
  )
}

export default FriendsRequestsDisplay;