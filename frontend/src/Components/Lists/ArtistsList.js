import React from 'react'
import ArtistListItem from './Items/ArtistListItem'

const ArtistsList = ({artists, onLike, onDislike, onFollow, onUnfollow}) => {
  return (
    <div>
      {artists.map(artist => <ArtistListItem
                                  artist={artist}
                                  onLike={onLike}
                                  onDislike={onDislike}
                                  onFollow={onFollow}
                                  onUnfollow={onUnfollow}
      />)}
    </div>
  )
}

export default ArtistsList;