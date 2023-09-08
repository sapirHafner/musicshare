import React from 'react'

import TopBar from '../TopBar'
import Display from '../Display'
import MyMusic from '../MyMusic'

const ArtistHome = () => {
  return (
  <div className='grid-container'>
  <TopBar type="artist" />
    <div className='main'>
        <div className='content'>
            <h1>Welcome to MusicShare</h1>
            <h3>This is the artist home page</h3>
            <Display components={{
              "My Music": <MyMusic />
            }} />
        </div>
    </div>
  </div>
  )
}

export default ArtistHome