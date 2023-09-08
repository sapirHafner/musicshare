import React, { useState, useEffect } from 'react'

import TopBar from '../TopBar'
import Display from '../Display'
import MyMusic from '../MyMusic'
import MusicDisplay from '../MusicDisplay'

import { fetchFullDetails } from '../../Common/ServerFunctions/MusicalEntitiesFunctions'

const ArtistHome = () => {
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
  <div className='grid-container'>
  <TopBar type="artist" />
    <div className='main'>
        <div className='content'>
            <h1>Welcome to MusicShare</h1>
            <h3>This is the artist home page</h3>
            <Display components={{
              "My Music": <MyMusic />,
              "Browse": <MusicDisplay
                artists={allArtists}
                albums={allAlbums}
                songs={allSongs}
              />
            }} />
        </div>
    </div>
  </div>
  )
}

export default ArtistHome