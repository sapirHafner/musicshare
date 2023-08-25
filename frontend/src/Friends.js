import React from 'react'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { fetchFriends, fetchDiscoveryProfiles} from './serverFunctions';
import MusicshareNavigationBar from './MusicshareNavigationBar';
import FriendsDisplay from "./FriendsDisplay"
import FriendsDiscovery from './FriendsDiscovery';
import LoadingScreen from './LoadingScreen';

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
    <div>
      <MusicshareNavigationBar selectedItem={"Friends"}/>
      {
        isLoaded ? (
          <div>
          {userFriends.length > 0 ? (
            <FriendsDisplay friends={userFriends}/>
          ) : (
            <p>You don't have any friends...</p>
          )
          }
          <FriendsDiscovery profiles={discoveryProfiles}/>
          </div>
        ) : (
        <LoadingScreen />
        )
      }
    </div>

  )
}

export default Friends;