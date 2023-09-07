import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import LoadingScreen from './LoadingScreen'
import TopBar from './TopBar'
import UserNavigationBar from './UserNavigationBar'

const UserPage = ({ component, isLoaded, selectedNavItem }) => {
  console.log(isLoaded)
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const { userId, userType } = cookies;

  useEffect(() => {
    if (!userId || userType !== "user") {
      navigate('/');
    }
  }, [userId, userType]);

  return (
    <div className='grid-container'>
      <TopBar />
      <UserNavigationBar selectedItem={selectedNavItem}/>
      <div className='main'>
        {
          isLoaded
          ?
            component
          :
          <LoadingScreen />
        }
      </div>
    </div>
  )
}

export default UserPage
