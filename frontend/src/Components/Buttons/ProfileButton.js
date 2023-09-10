import React from 'react'
import profileButton from '../../Assets/Icons/user-icon.png'
import { useState } from 'react';
import Link from '../Link';
import { deleteUser } from '../../Common/ServerFunctions/UserFunctions';
import { useNavigate } from 'react-router-dom';

const ProfileButton = ({ profile }) => {
  const [ isClicked, setIsClicked ] = useState(false);
  const navigate = useNavigate;
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
            <span className='clickable' onClick={() => {
               deleteUser(profile.userId, "user")
               navigate('/logout')
            }}>
              delete user
            </span>
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