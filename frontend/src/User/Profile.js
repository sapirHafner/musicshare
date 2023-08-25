import React, { useEffect } from 'react'
import { useState } from 'react';
import { fetchUserProfile, fetchUserPosts } from '../serverFunctions';
import { useCookies } from 'react-cookie';
import UserNavigationBar from './UserNavigationBar';
import PostsDisplay from '../Common/PostsDisplay';
import LoadingScreen from '../Common/LoadingScreen';

const Profile = () => {
  const [cookies] = useCookies(['userId']);
  const userId = cookies['userId'];
  const [profile, setProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  const fetchData = async () => {
    setProfile(await fetchUserProfile(userId));
    setUserPosts(await fetchUserPosts(userId));

    setIsLoaded(true);

  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
        <UserNavigationBar selectedItem = "Profile" />
        { isLoaded
        ?
        <div>
          This is your profile!!! <br />
          your name is {profile.FirstName} <br />
          your last name is {profile.LastName} <br />
          your email is {profile.Email} <br />

          <br />
          <br />
          <br />
          <div>
            <h4>your posts:</h4>
            <PostsDisplay posts={userPosts}/>

          </div>
        </div>
        :
          <LoadingScreen />
        }
    </div>
  );
};

export default Profile;