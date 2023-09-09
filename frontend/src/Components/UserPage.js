import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import LoadingScreen from './LoadingScreen'
import TopBar from './TopBar'
import UserNavigationBar from './UserNavigationBar'

import { fetchUserProfileBox } from '../Common/ServerFunctions/ProfilesFunctions';
import { getFeatureFlag } from '../Common/ServerFunctions/featureFlagsFunctions'

const UserPage = ({ component, isLoaded, selectedNavItem }) => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [ profileBox, setProfileBox ] = useState()
  const [ isProfileLoaded, setIsProfileLoaded ] = useState(false);

  const { userId, userType } = cookies;

  useEffect(() => {
    if (!userId || userType !== "user") {
      navigate('/');
    }
    const fetchData = async () => {
      const imagesFeatureFlag = await getFeatureFlag("images");
      const fetchedProfile = await fetchUserProfileBox(userId);
      if (!imagesFeatureFlag) {
        delete fetchedProfile.imageUrl;
      }
      setProfileBox(fetchedProfile);
      setIsProfileLoaded(true);
    }
    fetchData();
  }, [userId, userType]);

  return (
    <div className='grid-container'>
      {isLoaded && isProfileLoaded ?
      <>
        <TopBar profile={profileBox}/>
        <UserNavigationBar selectedItem={selectedNavItem}/>
        <div className='main'>
        {component}
        </div>
      </>
      :
        <LoadingScreen />
      }

    </div>
  )
}

export default UserPage
