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
  const [ deleteProfileFeatureFlag, setDeleteProfileFeatureFlag ] = useState(false);
  const [ aboutUsPageFeatureFlag, setAboutUsPageFeatureFlag ] = useState(false);
  const [ codeOfConductPageFeatureFlag, setCodeOfConductPageFeatureFlag ] = useState(false);

  const { userId, userType } = cookies;

  useEffect(() => {
    if (!userId || userType !== "user") {
      navigate('/');
    }
    const fetchData = async () => {
      setDeleteProfileFeatureFlag(await getFeatureFlag("deletes"));
      setAboutUsPageFeatureFlag(await getFeatureFlag("aboutUsPage"))
      setCodeOfConductPageFeatureFlag(await getFeatureFlag("codeOfConductPage"))
      const fetchedProfile = await fetchUserProfileBox(userId);
      setProfileBox(fetchedProfile);
      setIsProfileLoaded(true);
    }
    fetchData();
  }, [userId, userType]);

  return (
    <div className='grid-container'>
      {isProfileLoaded ? <TopBar profile={profileBox} deleteButton={deleteProfileFeatureFlag} aboutUs={aboutUsPageFeatureFlag} codeOfConduct={codeOfConductPageFeatureFlag}cp/>  : <TopBar profile={{}} />}
      <UserNavigationBar selectedItem={selectedNavItem}/>

        <div className='main'>
        {isLoaded ? component : <LoadingScreen /> }
        </div>
    </div>
  )
}

export default UserPage
