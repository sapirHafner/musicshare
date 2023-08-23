import React from 'react'

const ProfileBox = ({userId, firstName, lastName}) => {
  return (
    <div>
        {firstName} {lastName} : {userId}
        (+)
    </div>
  )
}

export default ProfileBox