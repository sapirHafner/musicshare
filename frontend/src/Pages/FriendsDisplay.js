import React from 'react'

const FriendsDisplay = ({ friends }) => {
  const friendsList = friends.map((friend) => {
    return <div> {friend.FirstName} {friend.LastName} </div>
  });
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