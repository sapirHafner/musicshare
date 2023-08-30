import React from 'react'

const FriendsRequestsDisplay = ({ FriendsRequests }) => {
  
  const friendsRequestsList = FriendsRequests.map((friendRequest) => {
    return <div> {friendRequest.FirstName} {friendRequest.LastName} </div>
  });

  return (
    <div> These are your friends Requests: <br />
      {friendsRequestsList}
    </div>
  )
}

export default FriendsRequestsDisplay;