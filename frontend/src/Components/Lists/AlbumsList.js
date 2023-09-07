import React from 'react'
import AlbumListItem from './Items/AlbumListItem'

const AlbumsList = ({albums}) => {
    const albumsComponents = albums.map(album => <AlbumListItem album={album}/>);
  return (
    <div>
        {albumsComponents}
    </div>
  )
}

export default AlbumsList