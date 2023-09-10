import React from 'react';

import Display from './Display'
import SongsList from './Lists/SongsList';
import ArtistsList from './Lists/ArtistsList';
import AlbumsList from './Lists/AlbumsList';

const MusicDisplay = ({artists, albums, songs, onLike, onDislike, onFollow, onUnfollow, onShare, onChange}) => {
  return (
    <div className='music-display'>
      <Display onChange={onChange} components={{
        "Artists": <ArtistsList artists={artists}
                                onLike={onLike}
                                onDislike={onDislike}
                                onFollow={onFollow}
                                onUnfollow={onUnfollow}
                                onShare={(id) => onShare("artist", id)}
                                />,
        "Albums": <AlbumsList albums={albums}
                              onLike={onLike}
                              onDislike={onDislike}
                              onShare={(id) => onShare("album", id)}
                              />,
        "Songs": <SongsList songs={songs}
                              onLike={onLike}
                              onDislike={onDislike}
                              onShare={(id) => onShare("song", id)}
                              />,
      }}/>
    </div>
  )
}

export default MusicDisplay;