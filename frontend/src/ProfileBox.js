import React from 'react'

const ProfileBox = ({userId, firstName, lastName}) => {
  return (
    <div>
        {firstName} {lastName} (+)
    </div>
  )
}

export default ProfileBox