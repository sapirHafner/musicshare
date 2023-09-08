import React from 'react'
import SongListItem from './Items/SongListItem'

const SongsList = ({ songs, onLike, onDislike }) => {
  return (
    <div>
      {songs.map(song => <SongListItem
                              song={song}
                              onLike={onLike}
                              onDislike={onDislike}
      />)}
    </div>
  )
}

export default SongsList;
