import React from 'react'

const UserProfile = ({profile}) => {
  return (
    <div>
        <div>{profile.FirstName} {profile.LastName}</div>
        <div>{profile.Email}</div>
    </div>
  )
}

export default UserProfile