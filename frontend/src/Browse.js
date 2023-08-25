import React, { useEffect, useState } from 'react'
import MusicshareNavigationBar from './MusicshareNavigationBar'
import MusicDisplay from './MusicDisplay'
import LoadingScreen from './LoadingScreen';
import { fetchSongs } from './serverFunctions';

const Browse = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setAllSongs(await fetchSongs());
      setIsLoaded(true);
    }
    fetchData();
  }, [])
  return (
    <div>
      <MusicshareNavigationBar selectedItem="Browse"/>
      {
        isLoaded ?
          <MusicDisplay songs={allSongs} />
        :
          <LoadingScreen />
      }
    </div>
  )
}

export default Browse