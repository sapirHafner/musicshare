import React from 'react'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { fetchFriends, fetchDiscoveryProfiles } from './serverFunctions';
import MusicshareNavigationBar from './MusicshareNavigationBar';
import FriendsDisplay from "./FriendsDisplay"
import FriendsDiscovery from './FriendsDiscovery';

const Friends = () => {
    const [cookies] = useCookies(['userId']);
    const userId = cookies['userId'];
    const [friends, setFriends] = useState([]);
    const [isFriendsLoaded, setIsFriendsLoaded] = useState(false);
    const [discoveryProfiles, setDiscoveryProfiles] = useState([]);
    const [isDiscoveryProfilesLoaded, setIsDiscoveryProfilesLoaded] = useState(false);

    const fetchData = async () => {
        const friendsProfiles = await fetchFriends(userId);
        setFriends(friendsProfiles);
        setIsFriendsLoaded(true);
        const discoveryProfiles = await fetchDiscoveryProfiles(userId);
        setDiscoveryProfiles(discoveryProfiles);
        setIsDiscoveryProfilesLoaded(true);
    }

    useEffect(() => {
        fetchData();
      }, [])

  return (
    <div>
      <MusicshareNavigationBar selectedItem={"Friends"}/>
      {
        isFriendsLoaded ?
          friends.length > 0 ?
            <FriendsDisplay friends={friends}/>
            :
            <p>You don't have any friends...</p>
        :
        <p>loading...</p>
      }
      <FriendsDiscovery profiles={discoveryProfiles}/>
    </div>

  )
}

export default Friends;