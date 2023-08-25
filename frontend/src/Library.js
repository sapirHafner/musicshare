import React from 'react'
import MusicshareNavigationBar from './MusicshareNavigationBar';
import SongsDisplay from './SongsDisplay';
import { fetchUserLikes, fetchSongs, addUserLike, removeUserLike } from './common/serverFunctions';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Library = () => {
  const [likes, setLikes ] = useState([]);
  const [cookies] = useCookies(['userId']);
  const [isLoaded, setIsLoaded ] = useState(false);

  const { userId } = cookies;

  const fetchData = async () => {
      const userLikes = await fetchUserLikes(userId);
      let likedSongs;
      if (userLikes.length !== 0) {
        likedSongs = await fetchSongs(userLikes);
      } else {
        likedSongs = [];
      }
      likedSongs.forEach(likedSong => {
        likedSong.liked = true;
      });
      setLikes(likedSongs);
      setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  },[])

  const onLiked = (objectId) => {
    addUserLike(userId, objectId)
  }

  const onDisliked = (objectId) => {
    removeUserLike(userId, objectId)
  }

  return (
    <div>
        <MusicshareNavigationBar selectedItem = "Library"/>
        {isLoaded ?
          likes.length !== 0 ?
            <div>
              <h3>You like:</h3>
              <SongsDisplay songItems={likes}
                            onLiked={onLiked}
                            onDisliked={onDisliked}/>
          </div>
        : <div>
            <p>you don't like any songs...</p>
          </div>
        : <p>loading...</p>
        }
    </div>
  )
}

export default Library;