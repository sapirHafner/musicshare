import React from 'react'
import AlbumBox from './AlbumBox'

const AlbumsDisplay = ({albums}) => {
    const albumsComponents = albums.map(album => <AlbumBox album={album}/>);
  return (
    <div>
        {albumsComponents}
    </div>
  )
}

export default AlbumsDisplay