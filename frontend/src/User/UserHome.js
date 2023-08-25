import React from 'react'
import UserNavigationBar from './UserNavigationBar'
const UserHome = () => {
  return (
    <div>
        <UserNavigationBar selectedItem = "Home"/>
        <h1>Welcome to MusicShare!</h1>
        <h2> You are at home! </h2>
    </div>
  )
}

export default UserHome