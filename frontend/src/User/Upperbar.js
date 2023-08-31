import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import SearchButton from '../Components/SearchButton/SearchButton'
import ProfileButton from '../Components/ProfileButton/ProfileButton'
const Upperbar = () => {
    const [cookies] = useCookies(['userId'])
    const [user, setUser] = useState({});
    const {userId} = cookies;
    const navigate = useNavigate();

  return (
    <div className='topbar'>
        <div className='clickable' onClick={() => navigate('/home')}>
            MusicShare
        </div>
        <div className='functions'>
            <SearchButton />
            <ProfileButton />
        </div>
    </div>
  )
}

export default Upperbar