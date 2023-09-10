import React from 'react'
import ProfileBox from '../Boxes/ProfileBox'

const ProfilesList = ({profiles, sendFriendRequset, removeFriendRequest, acceptFriendRequest, declineFriendRequest,other }) => {
  return (
    <div>
          {profiles.map((profiles) => <ProfileBox profile={profiles}
                                                sendFriendRequest={sendFriendRequset}
                                                removeFriendRequest={removeFriendRequest}
                                                acceptFriendRequest={acceptFriendRequest}
                                                declineFriendRequest={declineFriendRequest}
                                                other={other} /> )}
    </div>
  )
}

export default ProfilesList