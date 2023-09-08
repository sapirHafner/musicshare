import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../Buttons/Button'
import Display from '../Display'

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
            <Display components={{
              "Features": <></>
            }} />
        </div>
        </div>
    </div>
  )
}

export default AdminHome