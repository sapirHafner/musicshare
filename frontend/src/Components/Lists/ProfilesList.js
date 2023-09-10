import React from 'react'
import ProfileBox from '../Boxes/ProfileBox'

const ProfilesList = ({profiles, sendFriendRequset, removeFriendRequest, acceptFriendRequest, declineFriendRequest }) => {
  return (
    <div>
          {profiles.map((profiles) => <ProfileBox profile={profiles}
                                                sendFriendRequest={sendFriendRequset}
                                                removeFriendRequest={removeFriendRequest}
                                                acceptFriendRequest={acceptFriendRequest}
                                                declineFriendRequest={declineFriendRequest} /> )}
    </div>
  )
}

export default ProfilesList