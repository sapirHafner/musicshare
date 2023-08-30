import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import userIcon from '../Images/user-icon.png'
import searchIcon from '../Images/search-icon.png'

const Upperbar = () => {
    const [cookies] = useCookies(['userId'])
    const [user, setUser] = useState({});

    const {userId} = cookies;

    useEffect(() => {
        const fetchData = async () => {
            //setUser(await fetchUserProfileBox(userId))
        };
        fetchData();
    },[])

  return (
    <div className='topbar'>
        <div>
            MusicShare
        </div>
        <div>
            <img class='icon' src={searchIcon}/>
            <img class='icon' src={userIcon}/>
        </div>
    </div>
  )
}

export default Upperbar