import React from 'react'
import AlbumListItem from './AlbumListItem'

const AlbumsDisplay = ({albums}) => {
    const albumsComponents = albums.map(album => <AlbumListItem album={album}/>);
  return (
    <div>
        {albumsComponents}
    </div>
  )
}

export default AlbumsDisplay