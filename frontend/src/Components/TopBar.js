import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileButton from './Buttons/ProfileButton'
import Link from './Link'

const TopBar = ({ profile, deleteButton, aboutUs, codeOfConduct }) => {
  console.log(aboutUs)
    const navigate = useNavigate();

  return (
    <div className='topbar'>
        <div className='clickable' onClick={() => navigate('/home')}>
            <span className="glow">MusicShare</span>
        </div>
         <div className='functions'>
            <div className='links'>
            {
              aboutUs && <Link text="About Us" url='/aboutus' />
            }
            {
              codeOfConduct && <Link text="Code of Conduct" url='/codeOfConduct' />
            }
            </div>
            <ProfileButton profile={ profile } deleteButton={deleteButton}/>
          </div>
    </div>
  )
}

export default TopBar;