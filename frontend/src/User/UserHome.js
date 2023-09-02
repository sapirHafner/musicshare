import React from 'react'
import UserNavigationBar from './UserNavigationBar'
import Upperbar from './Upperbar';
import Feed from './Feed';

const UserHome = () => {
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