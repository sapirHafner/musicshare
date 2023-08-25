import React from 'react'
import ArtistNavBar from './ArtistNavBar'
const ArtistHome = () => {
  return (
    <div>
        <ArtistNavBar selectedItem={"Home"}/>
        <h1>Welcome to MusicShare</h1>
        <h3>This is the artist home page</h3>
    </div>
  )
}

export default ArtistHome