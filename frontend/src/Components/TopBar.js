import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileButton from './Buttons/ProfileButton'

const TopBar = ({ profile, deleteButton }) => {
    const navigate = useNavigate();

  return (
    <div className='topbar'>
        <div className='clickable' onClick={() => navigate('/home')}>
            <span className="glow">MusicShare</span>
        </div>
         <div className='functions'>
            <ProfileButton profile={ profile } deleteButton={deleteButton}/>
          </div>
    </div>
  )
}

export default TopBar;