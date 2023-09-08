import React, { useEffect, useState } from 'react'
import MusicDisplay from '../Common/MusicDisplay'
import LoadingScreen from '../Common/LoadingScreen';
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'

const ArtistBrowse = () => {
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