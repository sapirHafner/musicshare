import React, { useEffect, useState } from 'react'
import UserPage from '../Components/UserPage'
import MusicDisplay from '../Components/MusicDisplay'
import { useCookies } from 'react-cookie';
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'

const Browse = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  const [allArtists, setAllArtists] = useState();
  const [allAlbums, setAllAlbums] = useState();
  const [allSongs, setAllSongs] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [ artists, albums, songs ] = await fetchFullDetails(userId);
      setAllArtists(artists);
      setAllAlbums(albums);
      setAllSongs(songs);
      setIsLoaded(true);
    }
    fetchData();
  }, [userId])

  return (
    <UserPage selectedNavItem='browse' isLoaded={isLoaded} component=
      <div>
        <h2>What music would you like to listen to today?</h2>
        <MusicDisplay artists={allArtists} albums={allAlbums} songs={allSongs} />
      </div>
    />
  )
}

export default Browse