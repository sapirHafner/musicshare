import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import UserPage from '../UserPage';
import Display from '../Display';
import PostsList from '../Lists/PostsList';

import { fetchFeedPosts } from '../../Common/ServerFunctions/PostsFunctions';
import { getTypePosts } from '../../Common/Utilities';
import { addUserLike, removeUserLike } from '../../Common/ServerFunctions/likesFunctions';
import { addFollower, removeFollower } from '../../Common/ServerFunctions/followersFunctions';

const UserHome = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const navigate = useNavigate()

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
        "All": <PostsList posts={posts.map(element => element.post)}
                          onLike={(id) => addUserLike(userId, id)}
                          onDislike={(id) => removeUserLike(userId, id)}
                          onFollow={(id) => addFollower(id, userId)}
                          onUnfollow={(id) => removeFollower(id, userId)}
                          onShare={(id, type) => navigate(`/newpost?type=${type}&id=${id}`)}
        />,
        "Friends": <PostsList posts={getTypePosts(posts, "friend")}
                              onLike={(id) => addUserLike(userId, id)}
                              onDislike={(id) => removeUserLike(userId, id)}
                              onFollow={(id) => addFollower(id, userId)}
                              onUnfollow={(id) => removeFollower(id, userId)}
                              onShare={(id, type) => navigate(`/newpost?type=${type}&id=${id}`)}

        />,
        "Follows": <PostsList posts={getTypePosts(posts, "follow")}
                              onLike={(id) => addUserLike(userId, id)}
                              onDislike={(id) => removeUserLike(userId, id)}
                              onFollow={(id) => addFollower(id, userId)}
                              onUnfollow={(id) => removeFollower(id, userId)}
                              onShare={(id, type) => navigate(`/newpost?type=${type}&id=${id}`)}

        />
        }}
      />
    />
  )
}

export default UserHome;