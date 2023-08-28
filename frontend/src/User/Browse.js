import React, { useEffect, useState } from 'react'
import UserNavigationBar from './UserNavigationBar'
import MusicDisplay from '../Common/MusicDisplay'
import LoadingScreen from '../Common/LoadingScreen';
import { fetchArtists } from '../ServerFunctions/ArtistFunctions';
import { fetchSongs } from '../ServerFunctions/SongFunctions';
import { useCookies } from 'react-cookie';
import { fetchAlbums } from '../ServerFunctions/AlbumFunctions';

const Browse = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  useEffect(() => {
    const fetchData = async () => {
      setAllArtists(await fetchArtists());
      setAllAlbums(await fetchAlbums());
      setAllSongs(await fetchSongs());
      setIsLoaded(true);
    }
    fetchData();
  }, [])

  return (
    <div>
      <UserNavigationBar selectedItem="Browse"/>
      {
        isLoaded ?
          <MusicDisplay artists={allArtists} albums={allAlbums} songs={allSongs} />
        :
          <LoadingScreen />
      }
    </div>
  )
}

export default Browse