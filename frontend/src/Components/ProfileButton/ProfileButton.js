import React from 'react'
import profileButton from './user-icon.png'
import { useState } from 'react';
import Link from '../Link/Link';
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
            <Link text={"Log Out"} url={`/logout`}/>
          </div>
        )
      }
    </div>
  )
}

export default ProfileButton