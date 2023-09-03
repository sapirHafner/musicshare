import React, { useEffect, useState } from 'react'
import LoadingScreen from '../Common/LoadingScreen';
import { useCookies } from 'react-cookie';
import PostsDisplay from '../Common/PostsDisplay'
import { enrichPosts, fetchUserPosts } from '../ServerFunctions/PostsFunctions';

const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const [cookies] = useCookies(['userId']);
    const [ loaded, setIsLoaded ] = useState(false);
    const { userId } = cookies;

    useEffect(() => {
        const fetchData = async () => {
            const myPosts = await fetchUserPosts(userId);
            setPosts(await enrichPosts(myPosts));
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