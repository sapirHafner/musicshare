import React from 'react'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { fetchFriends } from '../ServerFunctions/FriendsFunctions';
import { fetchDiscoveryProfiles } from '../ServerFunctions/DiscoveryFunctions';
import UserNavigationBar from './UserNavigationBar';
import FriendsDisplay from "./FriendsDisplay"
import FriendsDiscovery from './FriendsDiscovery';
import LoadingScreen from '../Common/LoadingScreen';
import Upperbar from './Upperbar';

const Friends = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const [userFriends, setUserFriends] = useState([]);
  const [discoveryProfiles, setDiscoveryProfiles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
      setUserFriends(await fetchFriends(userId));
      setDiscoveryProfiles(await fetchDiscoveryProfiles(userId));
      setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='grid-container'>
      <Upperbar />
      <div className='sidebar'>
        <UserNavigationBar selectedItem = "Friends"/>
      </div>
      <div className='main'>
        <div className='content'>
        {
          isLoaded ?
            <div>
              {userFriends.length > 0 ? (
                <FriendsDisplay friends={userFriends}/>
              ) : (
                    <p>You don't have any friends...</p>
                  )
                  }
                  <FriendsDiscovery profiles={discoveryProfiles}/>
                  </div>
                  :
                    <LoadingScreen />
          }
        </div>
      </div>
    </div>
  )
}

export default Friends;

