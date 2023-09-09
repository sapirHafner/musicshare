import React from 'react'
import SongListItem from './Items/SongListItem'

const SongsList = ({ songs, onLike, onDislike, onShare }) => {
  return (
    <div>
      {songs.map(song => <SongListItem
                              song={song}
                              onLike={onLike}
                              onDislike={onDislike}
                              onShare={onShare}
      />)}
    </div>
  )
}

export default SongsList;
