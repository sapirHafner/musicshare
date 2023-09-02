import React, { useEffect, useState } from 'react';
import Button from '../Common/Button'
import PostsDisplay from '../Common/PostsDisplay'
import LoadingScreen from '../Common/LoadingScreen'
import { fetchFeedPosts } from '../ServerFunctions/PostsFunctions';
import { useCookies } from 'react-cookie';
import { getTypePosts } from '../Common/Utilities';

const Feed = ({}) => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  const [ selectedCategory, setSelectedCategory ] = useState("All")
  const [ posts, setPosts ] = useState([])
  const [ loaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPosts(await fetchFeedPosts(userId))
      setIsLoaded(true);
    };

    fetchData()
  }, [])
  const categoryComponents = {
      "All": <PostsDisplay posts={posts.map(element => element.post)}/>,
      "Friends": <PostsDisplay posts={getTypePosts(posts, "friend")}/>,
      "Follows": <PostsDisplay posts={getTypePosts(posts, "follow")}/>,
  }

  return (
    loaded ?
    <div className='musicdisplay feed'>
      <div className='displaybuttons'>
          <Button text="All" selected={selectedCategory === "All"} onClick={() => {setSelectedCategory("All")}}/>
          <Button text="Friends" selected={selectedCategory === "Friends"} onClick={() => {setSelectedCategory("Friends")}}/>
          <Button text="Follows" selected={selectedCategory === "Follows"} onClick={() => {setSelectedCategory("Follows")}}/>
      </div>
      <div>
        {categoryComponents[selectedCategory]}
      </div>
    </div>
    : <LoadingScreen />
  )
}

export default Feed;