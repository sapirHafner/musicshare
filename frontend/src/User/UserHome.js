import React, { useState } from 'react'
import UserNavigationBar from './UserNavigationBar'
import Upperbar from './Upperbar';

const UserHome = () => {
  return (
    <div className='grid-container'>
      <Upperbar />
      <div className='sidebar'>
          <UserNavigationBar selectedItem = "Home"/>
      </div>
      <div className='main'>
        <div className='content'>
          <h1>Welcome to MusicShare!</h1>
        </div>
      </div>
    </div>
  )
}

export default UserHome