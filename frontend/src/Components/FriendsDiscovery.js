import React from 'react'
import ProfileBox from '../Components/Boxes/ProfileBox'
import { addFriendRequest, removeFriendRequestFromDB } from '../Common/ServerFunctions/FriendsFunctions';

const FriendsDiscovery = ({ profiles, userId}) => {
    const profileBoxes = profiles.map(profile =>
        <ProfileBox
            myId={userId}
            userId={profile.UserId}
            firstName={profile.FirstName}
            lastName={profile.LastName}
            sendRequest={addFriendRequest}
            removeRequest={removeFriendRequestFromDB}
            isFriend={profile.isFriend}
            isFriendRequestSent={profile.isFriendRequestSent}
        />
    )
  return (
    <div>
        <br></br>
        ________________________________________________________________________
        <h2>Discover new people</h2>
        {profileBoxes}
        ________________________________________________________________________
    </div>
  )
}

export default FriendsDiscovery