import React from 'react'

import ArtistHeader from './Headers/ArtistHeader'
import AlbumBox from './Boxes/AlbumBox'
import PostsList from './Lists/PostsList'
import Display from './Display'

const ArtistProfile = ({ artist, albums, posts, artistPosts, onLike, onDislike, onFollow, onUnfollow, onShare, onDeleteAlbum }) => {
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
        <Display components={
           {
            "Artist Posts": <PostsList posts={artistPosts} />,
            ...(posts && { "Posted About": <PostsList posts={posts} /> })
           }
        }/>
    </div>
  )
}

export default ArtistProfile