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
        setUserPosts(await fetchPostsFullDetails(await fetchUserPosts(id), userId));
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
              <UserProfile profile={profile} />
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