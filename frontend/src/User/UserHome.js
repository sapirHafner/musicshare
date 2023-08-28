import React from 'react'
import UserNavigationBar from './UserNavigationBar'
const UserHome = () => {
  return (
    <div className='grid-container'>
        <UserNavigationBar selectedItem = "Home"/>
        <div className='content'>
          <h1>Welcome to MusicShare!</h1>
          <h2> You are at home! </h2>
        </div>
    </div>
  )
}

export default UserHome