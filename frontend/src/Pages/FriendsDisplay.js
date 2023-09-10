import React from 'react'
import ProfileBox from '../Components/Boxes/ProfileBox';

const FriendsDisplay = ({ friends }) => {
  const friendsList = friends.map((friend) => <ProfileBox profile={friend}/>);
  return (

  )
}

export default FriendsDisplay;