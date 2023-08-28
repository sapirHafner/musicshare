import React from 'react'
import Artist from './Artist'

const ArtistsDisplay = ({artists}) => {
  const artistsComponents = artists.map(artist => <Artist name={artist.Name}/>)
  return (
    <div>
      {artistsComponents}
    </div>
  )
}

export default ArtistsDisplay