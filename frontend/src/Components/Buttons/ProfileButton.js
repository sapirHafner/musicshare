import React from 'react'
import profileButton from '../../Assets/Icons/user-icon.png'
import { useState } from 'react';
import Link from '../Link';
import { useCookies } from 'react-cookie';

const ProfileButton = () => {
  const [ isClicked, setIsClicked ] = useState([false]);
  const [ cookies ] = useCookies();
  const { userId } = cookies;
  const onClick = () => setIsClicked(!isClicked)
  return (
    <div>
      <span onClick={onClick}>
        <img class='icon clickable' src={profileButton}/>
      </span>
      {
        isClicked ? (
          <></>
        ) : (
          <div className='userbuttonoptions'>
            <Link text={"Profile"} url={`/user/${userId}`}/>
            <span id="logout">
              <Link text={"Log Out"} url={`/logout`}/>
            </span>
          </div>
        )
      }
    </div>
  )
}

export default ProfileButton