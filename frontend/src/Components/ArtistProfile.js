import React from 'react'

import ArtistHeader from './Headers/ArtistHeader'
import AlbumBox from './Boxes/AlbumBox'
import PostsList from './Lists/PostsList'

const ArtistProfile = ({ artist, albums, posts, onLike, onDislike, onFollow, onUnfollow, onShare, onDeleteAlbum }) => {
    return (
    <div className='artistcontainer'>
        <ArtistHeader artist={artist}
                    onLike={onLike}
                    onDislike={onDislike}
                    onFollow={onFollow}
                    onUnfollow={onUnfollow}
                    onShare={onShare}
        />
        <div className='content albums'>
            {albums.map(album => <AlbumBox album={album} className="min" onDelete={onDeleteAlbum} />)}
        </div>
        <PostsList posts={posts} />
    </div>
  )
}

export default ArtistProfile