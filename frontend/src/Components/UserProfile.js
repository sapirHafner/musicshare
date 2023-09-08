import React from 'react'

const UserProfile = ({profile}) => {
  return (
    <div>
        <div>{profile.firstName} {profile.lastName}</div>
        <div>{profile.email}</div>
    </div>
  )
}

export default UserProfile