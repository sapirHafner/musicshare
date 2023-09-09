import React from 'react'
import ArtistListItem from './Items/ArtistListItem'

const ArtistsList = ({artists, onLike, onDislike, onFollow, onUnfollow, onShare}) => {
  return (
    <div>
      {artists.map(artist => <ArtistListItem
                                  artist={artist}
                                  onLike={onLike}
                                  onDislike={onDislike}
                                  onFollow={onFollow}
                                  onUnfollow={onUnfollow}
                                  onShare={onShare}
      />)}
    </div>
  )
}

export default ArtistsList;