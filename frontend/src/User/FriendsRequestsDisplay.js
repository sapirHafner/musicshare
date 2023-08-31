import React from 'react'

const FriendsRequestsDisplay = ({ friendsRequests }) => {
  const friendsRequestsList = friendsRequests.map((friendRequest) => {
    return <div> {friendRequest.FirstName} {friendRequest.LastName} </div>
  });

  return (
    <div> These are your friends Requests: <br />
      {friendsRequestsList}
    </div>
  )
}

export default FriendsRequestsDisplay;