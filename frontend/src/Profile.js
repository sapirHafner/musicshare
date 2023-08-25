import React, { useEffect } from 'react'
import { useState } from 'react';
import { fetchUserProfile, fetchUserPosts, fetchMusicalObjects } from './serverFunctions';
import { useCookies } from 'react-cookie';
import MusicshareNavigationBar from './MusicshareNavigationBar';
import PostsDisplay from './PostsDisplay';

const Profile = () => {
  const [cookies] = useCookies(['userId']);
  const userId = cookies['userId'];
  const [profile, setProfile] = useState({});
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isUserPostsLoaded, setIsUserPostsLoaded] = useState(false);


  const fetchData = async () => {
    const profile = await fetchUserProfile(userId);
    setProfile(profile);
    setIsProfileLoaded(true);
    const userPosts = await fetchUserPosts(userId)
    setUserPosts(userPosts);
    setIsUserPostsLoaded(true);

  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
        <MusicshareNavigationBar selectedItem = "Profile" />
        { isProfileLoaded && isUserPostsLoaded
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
          <p> loading... </p>
        }
    </div>
  );
};

export default Profile;