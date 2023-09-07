import React from 'react'
import TopBar from '../Components/TopBar'
import Display from '../Components/Display'

const ArtistHome = () => {
  return (
  <div className='grid-container'>
  <TopBar type="artist" />
  <div className='sidebar'>
  </div>
  <div className='main'>
    <div className='content'>
      <h1>Welcome to MusicShare</h1>
      <h3>This is the artist home page</h3>
      <Display />
    </div>
  </div>
  </div>
  )
}

export default ArtistHome