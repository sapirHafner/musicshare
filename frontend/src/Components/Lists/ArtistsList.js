import React from 'react'
import ArtistListItem from './Items/ArtistListItem'

const ArtistsList = ({artists}) => {
  const artistsComponents = artists.map(artist => <ArtistListItem artist={artist}/>)
  return (
    <div>
      {artistsComponents}
    </div>
  )
}

export default ArtistsList;