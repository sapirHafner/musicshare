import React from 'react'
import ProfileBox from './ProfileBox'
const FriendsDiscovery = ({profiles}) => {
    const profileBoxes = profiles.map(profile =>
        <ProfileBox
            firstName={profile.firstName}
            lastName={profile.lastName}
        />
    )
  return (
    <div>
        ________________________________________________________________________
        <h2>Discover new people</h2>
        {
            profileBoxes
        }
        ________________________________________________________________________
    </div>
  )
}

export default FriendsDiscovery