import React from 'react'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import UserPage from '../Components/UserPage'
import ProfilesList from '../Components/Lists/ProfilesList';
import SearchButton from '../Components/Buttons/SearchButton'

import { addFriendshipBetweenUsers } from '../Common/ServerFunctions/FriendsFunctions';
import { fetchDiscoveryProfiles } from '../Common/ServerFunctions/DiscoveryFunctions';
import { addFriendRequest, removeFriendRequest } from '../Common/ServerFunctions/FriendsRequestsFunctions';
import { fetchAllUsersProfileBoxes } from '../Common/ServerFunctions/ProfilesFunctions';

const AllUsers = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const [allUsers, setAllUsers] = useState();
  const [relevantUsers, setRelevantUsers] = useState()
  const [discoveryProfiles, setDiscoveryProfiles] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
      const fetchedUsers = (await fetchAllUsersProfileBoxes(userId)).filter(_ => _.userId != userId);
      setAllUsers(fetchedUsers);
      setRelevantUsers(fetchedUsers);
      setDiscoveryProfiles(await fetchDiscoveryProfiles(userId, 5));
      setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, [])


  const onChange = (searchTerm) => setRelevantUsers(allUsers.filter(user => `${user.firstName} ${user.lastName}`.toLowerCase().startsWith(searchTerm)))

  return (
    <UserPage selectedNavItem='allUsers' isLoaded={isLoaded} component={
        <div>
          <br/><br/><br/>
            <div>
            _______________________________________________________________________
            <br />
            <br />
            <h2>Discover new people</h2>
                     <ProfilesList profiles={discoveryProfiles}
                           sendFriendRequset={(id) => addFriendRequest(userId, id)}
                           removeFriendRequest={(id) => removeFriendRequest(userId, id)}
                           acceptFriendRequest={(id) => {
                              addFriendshipBetweenUsers(id, userId)
                              removeFriendRequest(id, userId)
                           }}
                           declineFriendRequest={(id) => removeFriendRequest(userId, id)}
                           other={true}
           />
           _______________________________________________________________________
              <SearchButton onChange={onChange} />
              <ProfilesList profiles={relevantUsers}
                           sendFriendRequset={(id) => addFriendRequest(userId, id)}
                           removeFriendRequest={(id) => removeFriendRequest(userId, id)}
                           acceptFriendRequest={(id) => {
                              addFriendshipBetweenUsers(id, userId)
                              removeFriendRequest(id, userId)
                           }}
                           declineFriendRequest={(id) => removeFriendRequest(userId, id)}
                           other={true}
              />
            </div>
          <br/><br/><br/>


        </div>
    }   />

  )
}

export default AllUsers;



