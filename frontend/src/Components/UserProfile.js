import React from 'react'

const UserProfile = ({profile}) => {
  return (
    <div>
        {
          profile.imageUrl &&
          <span style={{"display": "inline-block", "width": "8rem"}}>
            <img src={profile.imageUrl} />
          </span>
        }
        <div>{profile.firstName} {profile.lastName}</div>
        <div>{profile.email}</div>
    </div>
  )
}

export default UserProfile