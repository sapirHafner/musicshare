import React from 'react'



const FriendsRequestsDisplay = ({ friendsRequests }) => {
  
 
  const friendsRequestsList = friendsRequests.map((friendRequest,id) => {
   return(
     <div className='friendsRequestsDisplayContainer'>
      <div> {friendRequest.FirstName} {friendRequest.LastName} </div>
      <button id='accept'>Accept</button> 
      <button id='decline'>Decline</button>
      </div>)
  });
  return (
    <div> These are your friends Requests: <br />
      {friendsRequestsList}
    </div>
  )
}

export default FriendsRequestsDisplay;