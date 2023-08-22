import React, { useEffect } from 'react'
import { useState } from 'react';
import { fetchUserProfile } from './serverFunctions';
import { useCookies } from 'react-cookie';
import MusicshareNavigationBar from './MusicshareNavigationBar';

const Profile = () => {
  const [cookies] = useCookies(['userId']);
  const [profile, setProfile] = useState({});
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  const fetchData = async () => {
    const profile = await fetchUserProfile(cookies['userId']);
    setProfile(profile);
    setIsProfileLoaded(true);
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
        <MusicshareNavigationBar selectedItem = "Profile" />
        This is your profile!!! <br />
        your name is {profile.FirstName} <br />
        your last name is {profile.LastName} <br />
        your email is {profile.Email} <br />
    </div>
  );
};

export default Profile;