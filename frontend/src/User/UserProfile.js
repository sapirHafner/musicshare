import React from 'react'

const UserProfile = ({profile}) => {
  return (
    <div>
        First name: {profile.FirstName} <br />
        Last name: {profile.LastName} <br />
        Email: {profile.Email} <br />
    </div>
  )
}

export default UserProfile