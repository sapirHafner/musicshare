import React, { useEffect } from 'react'
import { fetchSongs, fetchUserLikes } from '../serverFunctions';
import { useState } from 'react';
import { addUserLike, removeUserLike } from '../serverFunctions';
import UserNavigationBar from './User/UserNavigationBar';
import SongsDisplay from './SongsDisplay';
import { useCookies } from 'react-cookie';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [isSongsLoaded, setIsSongsLoaded] = useState(false);
  const [cookies] = useCookies(['userId']);
  const userId = cookies['userId'];

  const fetchData = async () => {
    const songs = await fetchSongs();
    const likedSongs = await fetchUserLikes(userId);
    songs.forEach(song => {
      song.liked = likedSongs.includes(song["_id"]);
    });
    setSongs(songs);
    setIsSongsLoaded(true);
  }
  useEffect(() => {
    fetchData();
  }, [])

  const onLiked = (objectId) => {
    addUserLike(userId, objectId)
  }

  const onDisliked = (objectId) => {
    removeUserLike(userId, objectId)
  }

  return (
    <div>
      <UserNavigationBar selectedItem={"Songs"}/>
      <SongsDisplay songItems={songs} onLiked={onLiked} onDisliked={onDisliked}/>
    </div>
  )
}

export default Songs;