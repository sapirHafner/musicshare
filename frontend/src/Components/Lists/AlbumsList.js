import React from 'react'
import AlbumListItem from './Items/AlbumListItem'

const AlbumsList = ({albums, onLike, onDislike}) => {
  return (
    <div>
      {albums.map(album => <AlbumListItem
                                album={album}
                                onLike={onLike}
                                onDislike={onDislike}
      />)}
    </div>
  )
}

export default AlbumsList