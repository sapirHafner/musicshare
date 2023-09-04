import React, { useEffect } from 'react'
import UserNavigationBar from './UserNavigationBar'
import Upperbar from './Upperbar';
import Feed from './Feed';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const { userId } = cookies;
  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId]);

  return (
    <div className='grid-container'>
      <Upperbar />
      <div className='sidebar'>
          <UserNavigationBar selectedItem = "Home"/>
      </div>
      <div className='main'>
        <div className='content'>
          <Feed />
        </div>
      </div>
    </div>
  )
}

export default UserHome