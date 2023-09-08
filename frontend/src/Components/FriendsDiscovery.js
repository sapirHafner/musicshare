import React from 'react'
import ProfileBox from '../Components/Boxes/ProfileBox'

const FriendsDiscovery = ({ profiles, sendFriendRequest, removeFriendRequest}) => {
  const profileBoxes = profiles.map(profile =>
      <ProfileBox
          profile={profile}
          sendFriendRequest={sendFriendRequest}
          removeFriendRequest={removeFriendRequest}
      />
  )
  return (
    <div>
        <h2>
          Discover new people
        </h2>
        {profileBoxes}
    </div>
  )
}

export default FriendsDiscovery