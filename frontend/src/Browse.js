import React, { useEffect, useState } from 'react'
import MusicshareNavigationBar from './MusicshareNavigationBar'
import MusicDisplay from './MusicDisplay'
import LoadingScreen from './LoadingScreen';
import { fetchArtists, fetchSongs } from './serverFunctions';

const Browse = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setAllArtists(await fetchArtists());
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