import React from 'react'
import ArtistListItem from './ArtistListItem'

const ArtistsDisplay = ({artists}) => {
  const artistsComponents = artists.map(artist => <ArtistListItem artist={artist}/>)
  return (
    <div>
      {artistsComponents}
    </div>
  )
}

export default ArtistsDisplay