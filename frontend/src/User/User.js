import React from 'react'
import { useState, useEffect } from 'react';
import { fetchUserProfile, fetchUserPosts } from '../serverFunctions';
import { useParams } from 'react-router-dom';
import Error from '../Common/Error';
import LoadingScreen from '../Common/LoadingScreen';
import UserNavigationBar from './UserNavigationBar';
import PostsDisplay from '../Common/PostsDisplay'

const User = () => {
    const [profile, setProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    useEffect(() => {
      const fetchData = async () => {
      setProfile(await fetchUserProfile(id));
      setUserPosts(await fetchUserPosts(id));
      setIsLoaded(true);
      }

      if (id === undefined) {
        return (<Error />)
      }
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
}

export default User;