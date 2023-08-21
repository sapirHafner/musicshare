import React, { useEffect } from 'react'
import { fetchSongs } from './serverFunctions';
import { useState } from 'react';
import MusicshareNavigationBar from './MusicshareNavigationBar';
import SongsDisplay from "./SongsDisplay"

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [isSongsLoaded, setIsSongsLoaded] = useState(false);
  const fetchData = async () => {
    const songs = await fetchSongs();
    setSongs(songs);
    setIsSongsLoaded(true);
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <MusicshareNavigationBar selectedItem={"Songs"}/>
      <SongsDisplay songItems={songs}/>
    </div>
  )
}

export default Songs;