import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import SearchButton from '../Components/SearchButton/SearchButton'
import ProfileButton from '../Components/ProfileButton/ProfileButton'
import { fetchUserProfileBox } from '../ServerFunctions/ProfilesFunctions'
import { fetchArtistByUserId } from '../ServerFunctions/ArtistFunctions'
import Link from '../Components/Link/Link'

const Upperbar = () => {
    const [cookies] = useCookies(['userId', 'userType'])
    const [username, setUsername] = useState({});
    const { userId, userType } = cookies;
    const [ loaded, isLoaded ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        setUsername(userType === "artist" ? (await fetchArtistByUserId(userId)).Name : (await fetchUserProfileBox(userId)).FirstName);
        isLoaded(true);
      }
      fetchData();
    },[])

  return (
    <div className='topbar'>
        <div className='clickable' onClick={() => navigate('/home')}>
            MusicShare
        </div>
        <div className='username'>
          {
            loaded && `Hello, ${username}!`
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

export default Upperbar