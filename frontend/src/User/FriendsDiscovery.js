import React from 'react'
import ProfileBox from '../Common/ProfileBox'
import { addFriendRequest } from '../ServerFunctions/FriendsFunctions';


const FriendsDiscovery = ({ profiles, userId}) => {
 
    const profileBoxes = profiles.map(profile =>
        <ProfileBox
            myId={userId}
            userId={profile.UserId}
            firstName={profile.FirstName}
            lastName={profile.LastName}
            sendRequest={addFriendRequest}
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