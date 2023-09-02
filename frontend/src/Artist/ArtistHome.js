import React from 'react'
import Upperbar from '../User/Upperbar'
import ArtistHomeDisplay from './ArtistHomeDisplay'

const ArtistHome = () => {
  return (
  <div className='grid-container'>
  <Upperbar type="artist" />
  <div className='sidebar'>
  </div>
  <div className='main'>
    <div className='content'>
      <h1>Welcome to MusicShare</h1>
      <h3>This is the artist home page</h3>
      <ArtistHomeDisplay />
    </div>
  </div>
  </div>
  )
}

export default ArtistHome