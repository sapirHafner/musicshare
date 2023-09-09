import React from 'react'
import profileButton from '../../Assets/Icons/user-icon.png'
import { useState } from 'react';
import Link from '../Link';

const ProfileButton = ({ profile }) => {
  const [ isClicked, setIsClicked ] = useState(false);
  const onClick = () => setIsClicked(!isClicked)
  return (
    <div className='profilebutton'>
      <span onClick={onClick}>
        <img class='icon clickable' src={profile.imageUrl ? profile.imageUrl : profileButton}/>
      </span>
      {
        isClicked &&
        (
          <div style={{"width": "max-content"}} className='userbuttonoptions' >
            <div style={{"color": "black"}} >
              { profile.firstName } { profile.lastName }
            </div>
            <Link text={"Profile"} url={`/user/${profile.userId}`}/>
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