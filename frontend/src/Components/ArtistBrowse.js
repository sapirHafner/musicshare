import React, { useEffect, useState } from 'react'
import MusicDisplay from '../Common/MusicDisplay'
import LoadingScreen from '../Common/LoadingScreen';
import { useCookies } from 'react-cookie';
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'

const ArtistBrowse = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const [ artists, albums, songs ] = await fetchFullDetails();
      setAllArtists(artists);
      setAllAlbums(albums);
      setAllSongs(songs);
      setIsLoaded(true);
    }
    fetchData();
  }, [])

  return (
    <div className='main'>
      <div className='content'>
      {
        isLoaded ?
          <MusicDisplay artists={allArtists} albums={allAlbums} songs={allSongs} type="artist"/>
        :
          <LoadingScreen />
      }
      </div>
    </div>
  )
}

export default ArtistBrowse