import React, { useEffect } from 'react'
import { useState } from 'react';
import { fetchUserProfile, fetchUserPosts, fetchMusicalObjects } from './common/serverFunctions';
import { useCookies } from 'react-cookie';
import MusicshareNavigationBar from './MusicshareNavigationBar';
import PostsDisplay from './PostsDisplay';
import LoadingScreen from './LoadingScreen';

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
        <MusicshareNavigationBar selectedItem = "Profile" />
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