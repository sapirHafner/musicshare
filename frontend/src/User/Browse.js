import React, { useEffect, useState } from 'react'
import UserNavigationBar from './UserNavigationBar'
import MusicDisplay from '../Common/MusicDisplay'
import LoadingScreen from '../Common/LoadingScreen';
import { fetchArtists } from '../ServerFunctions/ArtistFunctions';
import { fetchSongs } from '../ServerFunctions/SongFunctions';
import { fetchUserLikes } from '../ServerFunctions/likesFunctions';
import { useCookies } from 'react-cookie';
import { setEntitiesLikes } from '../Common/Utilities';

const Browse = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [likes, setLikes] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);

  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  useEffect(() => {
    const fetchData = async () => {
      setLikes(await fetchUserLikes(userId));
      setAllArtists(setEntitiesLikes(await fetchArtists(), likes));
      setAllSongs(setEntitiesLikes(await fetchSongs(), likes));
      setIsLoaded(true);
    }
    fetchData();
  }, [likes])

  return (
    <div>
      <UserNavigationBar selectedItem="Browse"/>
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