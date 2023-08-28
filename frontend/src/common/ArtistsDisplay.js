import React from 'react'
import ArtistBox from './ArtistBox'

const ArtistsDisplay = ({artists}) => {
  const artistsComponents = artists.map(artist => <ArtistBox name={artist.Name}/>)
  return (
    <div>
      {artistsComponents}
    </div>
  )
}

export default ArtistsDisplay