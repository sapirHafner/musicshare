import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import userIcon from '../Images/user-icon.png'
import searchIcon from '../Images/search-icon.png'
import { useNavigate } from 'react-router-dom'

const Upperbar = () => {
    const [cookies] = useCookies(['userId'])
    const [user, setUser] = useState({});
    const {userId} = cookies;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            //setUser(await fetchUserProfileBox(userId))
        };
        fetchData();
    },[])

  return (
    <div className='topbar'>
        <div className='clickable' onClick={() => navigate('/home')}>
            MusicShare
        </div>
        <div>
            <img class='icon clickable' src={searchIcon}/>
            <img class='icon clickable' src={userIcon}/>
        </div>
    </div>
  )
}

export default Upperbar