import React from 'react'

const Album = ({album}) => {
  return (
    <div>
        name: {album.Name} <br />
        artist: {album.artist.Name}
        <br />
        <br />
    </div>
  )
}

export default Album