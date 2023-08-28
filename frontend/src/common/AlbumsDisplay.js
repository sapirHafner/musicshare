import React from 'react'
import Album from './Album'

const AlbumsDisplay = ({albums}) => {
    const albumsComponents = albums.map(album => <Album album={album}/>);
  return (
    <div>
        {albumsComponents}
    </div>
  )
}

export default AlbumsDisplay