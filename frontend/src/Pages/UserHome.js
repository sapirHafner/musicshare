import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import UserPage from '../Components/UserPage';
import Display from '../Components/Display';
import PostsList from '../Components/Lists/PostsList';

import { fetchFeedPosts } from '../Common/ServerFunctions/PostsFunctions';
import { getTypePosts } from '../Common/Utilities';

const UserHome = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  const [posts, setPosts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPosts(await fetchFeedPosts(userId))
      setIsLoaded(true);
    };

    fetchData()
  }, [userId])

  return (
    <UserPage selectedNavItem='home' isLoaded={isLoaded} component=
      <Display components={{
        "All": <PostsList posts={posts.map(element => element.post)}/>,
        "Friends": <PostsList posts={getTypePosts(posts, "friend")}/>,
        "Follows": <PostsList posts={getTypePosts(posts, "follow")}/>
        }}
      />
    />
  )
}

export default UserHome;