import React from 'react'
import AlbumListItem from './Items/AlbumListItem'

const AlbumsList = ({albums, onLike, onDislike, onShare }) => {
  return (
    <div>
      {albums.map(album => <AlbumListItem
                                album={album}
                                onLike={onLike}
                                onDislike={onDislike}
                                onShare={onShare}
      />)}
    </div>
  )
}

export default AlbumsList