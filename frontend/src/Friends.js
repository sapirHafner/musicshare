import React from 'react'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { fetchFriends } from './serverFunctions';
import MusicshareNavigationBar from './MusicshareNavigationBar';
import FriendsDisplay from "./FriendsDisplay"

const Friends = () => {
    const [cookies] = useCookies(['userId']);
    const [friends, setFriends] = useState([]);
    const [isFriendsLoaded, setIsFriendsLoaded] = useState(false);
    const fetchData = async () => {
        const friendsProfiles = await fetchFriends(cookies['userId']);
        setFriends(friendsProfiles);
        setIsFriendsLoaded(true);
    }

    useEffect(() => {
        fetchData();
      }, [])

  return (
    <div>
      <MusicshareNavigationBar selectedItem={"Friends"}/>
      <FriendsDisplay friends={friends}/>
    </div>

  )
}

export default Friends