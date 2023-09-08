import React from 'react'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import UserPage from '../Components/UserPage'

import FriendsDisplay from "./FriendsDisplay"
import FriendsDiscovery from '../Components/FriendsDiscovery';

import { fetchFriends } from '../Common/ServerFunctions/FriendsFunctions';
import { fetchDiscoveryProfiles } from '../Common/ServerFunctions/DiscoveryFunctions';
import { addFriendRequest, removeFriendRequest } from '../Common/ServerFunctions/FriendsRequestsFunctions';

const Friends = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const [userFriends, setUserFriends] = useState([]);
  const [discoveryProfiles, setDiscoveryProfiles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
      setUserFriends(await fetchFriends(userId));
      setDiscoveryProfiles(await fetchDiscoveryProfiles(userId, 5));
      setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <UserPage selectedNavItem='friends' isLoaded={isLoaded} component=
        <div>
            <FriendsDisplay friends={userFriends}/>
            <FriendsDiscovery profiles={discoveryProfiles}
                              sendFriendRequest={(id) => addFriendRequest(userId, id)}
                              removeFriendRequest={(id) => removeFriendRequest(userId, id)}
            />
        </div>
    />

  )
}

export default Friends;

