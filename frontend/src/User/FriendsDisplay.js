import React from 'react'

const FriendsDisplay = ({ friends }) => {
  const friendsList = friends.map((friend) => {
    return <div> {friend.FirstName} {friend.LastName} </div>
  });
  
  return (
    <div> These are your friends: <br />
      {friendsList}
    </div>
  )
}

export default FriendsDisplay;