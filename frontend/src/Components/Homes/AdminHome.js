import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../Buttons/Button'
import Display from '../Display'
import Logs from '../Logs'
import UsersList from '../Lists/UsersList'
import FeatureFlags from '../FeatureFlags'
import LoadingScreen from '../LoadingScreen'

import { createFeatureFlag, deleteFeatureFlag, getFeatureFlags } from '../../Common/ServerFunctions/featureFlagsFunctions'

const AdminHome = () => {
  const [featureFlags, setFeatureFlags] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setFeatureFlags(await getFeatureFlags())
      setIsLoaded(true);
    };
    fetchData();
  },[])


  const navigate = useNavigate();
  return (
    <div className='grid-container'>
        <div className='topbar'>
          <Button text="logout" onClick={() => navigate('/logout')}/>
        </div>
        <div className='main'>
        <div className='content'>
        {
          isLoaded ?
          <>
            <h1>MusicShare</h1>
              <h3>This is the admin home page</h3>
              <Display components={{
                "Logs": <Logs />,
                "Users": <UsersList />,
                "Feature Flags": <FeatureFlags featureFlags={featureFlags}
                                                onCreate={(name) => createFeatureFlag({name, active: false})}
                                                onDelete={(name) => deleteFeatureFlag(name)}
                                />

              }} />
          </>
          :
          <LoadingScreen />
        }

        </div>
        </div>
    </div>
  )
}

export default AdminHome