import React from 'react'
import ProfileBox from '../Components/Boxes/ProfileBox';

const FriendsDisplay = ({ friends }) => {
  const friendsList = friends.map((friend) => <ProfileBox profile={friend}/>);
  return (
    friendsList.length > 0 ?
    <div>
      These are your friends: <br />
      {friendsList}
    </div>
    :
    <p>
      Oops.. no friends yet?
      </p>
  )
}

export default FriendsDisplay;