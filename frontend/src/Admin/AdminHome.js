import React from 'react'
import Button from '../Common/Button'
import { useNavigate } from 'react-router-dom'
import AdminDisplay from './AdminDisplay'
const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className='grid-container'>
        <div className='topbar'>
          <Button text="logout" onClick={() => navigate('/logout')}/>
        </div>
        <div className='main'>
        <div className='content'>
            <h1>MusicShare</h1>
            <h3>This is the admin home page</h3>
            <AdminDisplay />
        </div>
        </div>
    </div>
  )
}

export default AdminHome