import React from 'react'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import LoadingScreen from '../Common/LoadingScreen';
import FriendsRequestsDisplay from "./FriendsRequestsDisplay"
import { fetchFriendsRequests } from '../ServerFunctions/FriendsFunctions';
import Upperbar from './Upperbar';
import UserNavigationBar from './UserNavigationBar';

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
        <div className='grid-container'>

          <Upperbar />
          <div className='sidebar'>
            <UserNavigationBar selectedItem = "Friends Requests"/>
          </div>

          <div className='main'>
            <div className='content'>
            {
              isLoaded ?
                <div>
                  <FriendsRequestsDisplay friendsRequests={userFriendsRequests}/>
                </div>
                    :
                        <LoadingScreen />
              }
            </div>
          </div>
        </div>
      )
    }

export default FriendsRequests;