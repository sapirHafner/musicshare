import React, { useEffect, useState } from 'react'
import { fetchPostsFullDetails } from '../ServerFunctions/PostsFunctions';
import LoadingScreen from '../Common/LoadingScreen';
import { useCookies } from 'react-cookie';
import PostsDisplay from '../Common/PostsDisplay'

const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const [cookies] = useCookies(['userId']);
    const [ loaded, setIsLoaded ] = useState(false);
    const { userId } = cookies;

    useEffect(() => {
        const fetchData = async () => {
            setPosts(await fetchPostsFullDetails(userId));
            setIsLoaded(true);
        }
        fetchData();
    }, [])

    return (
        <div>
            {
                loaded ?
                    <PostsDisplay posts={posts}/>
                :
                    <LoadingScreen />
            }
        </div>
    )
}

export default MyPosts