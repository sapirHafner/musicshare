import React from 'react'
import { useState, useEffect } from 'react';
import { fetchUserProfile } from '../ServerFunctions/ProfilesFunctions';
import { fetchPostsFullDetails, fetchUserPosts } from '../ServerFunctions/PostsFunctions';
import { useParams } from 'react-router-dom';
import Error from '../Common/Error';
import LoadingScreen from '../Common/LoadingScreen';
import UserNavigationBar from './UserNavigationBar';
import PostsDisplay from '../Common/PostsDisplay'
import UserProfile from './UserProfile';
import { useCookies } from 'react-cookie';

const User = () => {
    const [profile, setProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    const [cookies] = useCookies(['userId']);
    const { userId } =  cookies;

    useEffect(() => {
      const fetchData = async () => {
        setProfile(await fetchUserProfile(id));
        setUserPosts(await fetchPostsFullDetails(id, userId));
        setIsLoaded(true);
      }

      if (id === undefined) {
        return (<Error />)
      }
      fetchData()
    }, []);


    return (
      <div className='grid-container'>
          <UserNavigationBar selectedItem = "Profile" />
          <div className='content'>
              { isLoaded
              ?
              <div>
                <UserProfile profile={profile} />
                <PostsDisplay posts={userPosts}/>
              </div>
              :
                <LoadingScreen />
              }
          </div>
      </div>
      );
}

export default User;

