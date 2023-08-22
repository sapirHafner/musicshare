import React from 'react'

const ProfileBox = ({firstName, lastName}) => {
  return (
    <div>
        {firstName} {lastName}
        (+)
    </div>
  )
}

export default ProfileBox