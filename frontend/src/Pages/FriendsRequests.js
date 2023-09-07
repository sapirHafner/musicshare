import React from 'react'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import UserPage from '../Components/UserPage';
import FriendsRequestsDisplay from "./FriendsRequestsDisplay"

import { fetchFriendsRequests } from '../Common/ServerFunctions/FriendsFunctions';

const FriendsRequests = () => {
    const [cookies] = useCookies(['userId']);
    const { userId } = cookies;
    const [userFriendsRequests, setUserFriendsRequests] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
      const profileBoxes = await fetchFriendsRequests(userId)
      setUserFriendsRequests(profileBoxes);
      setIsLoaded(true);
    }

    useEffect(() => {
        fetchData();
      }, [])

      return (
        <UserPage selectedNavItem={'friendsRequests'} isLoaded={isLoaded} component=
          <FriendsRequestsDisplay friendsRequests={userFriendsRequests}/>
        />
      )
    }

export default FriendsRequests;