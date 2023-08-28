import React, { useEffect, useState } from 'react'
import UserNavigationBar from './UserNavigationBar'
import MusicDisplay from '../Common/MusicDisplay'
import LoadingScreen from '../Common/LoadingScreen';
import { useCookies } from 'react-cookie';
import { fetchFullDetails } from '../ServerFunctions/MusicalObjectsFunctions'

const Browse = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  useEffect(() => {
    const fetchData = async () => {
      const [ artists, albums, songs ] = await fetchFullDetails(userId);
      setAllArtists(artists);
      setAllAlbums(albums);
      setAllSongs(songs);
      setIsLoaded(true);
    }
    fetchData();
  }, [])

  return (

    <div className='grid-container'>
      <UserNavigationBar selectedItem="Browse"/>
      <div className='content'>
      {
          isLoaded ?
            <MusicDisplay artists={allArtists} albums={allAlbums} songs={allSongs} />
          :
            <LoadingScreen />
      }
      </div>
    </div>
  )
}

export default Browse