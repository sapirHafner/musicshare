import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import SearchButton from './Buttons/SearchButton'
import ProfileButton from './Buttons/ProfileButton'
import { fetchUserProfileBox } from '../Common/ServerFunctions/ProfilesFunctions'
import { fetchArtistByUserId } from '../Common/ServerFunctions/ArtistFunctions'
import Link from './Link'

const TopBar = () => {
    const [cookies] = useCookies(['userId', 'userType'])
    const [username, setUsername] = useState({});
    const { userId, userType } = cookies;
    const [ loaded, isLoaded ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        setUsername(userType === "artist" ? (await fetchArtistByUserId(userId)).name : (await fetchUserProfileBox(userId)).firstName);
        isLoaded(true);
      }
      fetchData();
    },[])

  return (
    <div className='topbar'>
        <div className='clickable' onClick={() => navigate('/home')}>
            <span className="glow">MusicShare</span>
        </div>
        <div className='username'>
          {
            loaded && `Hello ${username}!`
          }
        </div>
         {userType === 'user' ?
         <div className='functions'>
            <SearchButton />
            <ProfileButton />
          </div>
          : <span id="logout">
                <Link text="Log Out" url='/logout'/>
            </span>
 }
    </div>
  )
}

export default TopBar;