import React from 'react';

import Display from './Display'
import SongsList from './Lists/SongsList';
import ArtistsList from './Lists/ArtistsList';
import AlbumsList from './Lists/AlbumsList';

const MusicDisplay = ({artists, albums, songs}) => {
  return (
    <div className='music-display'>
      <Display components={{
        "Artists": <ArtistsList artists={artists}/>,
        "Albums": <AlbumsList albums={albums}/>,
        "Songs": <SongsList songs={songs}/>
      }}/>
    </div>
  )
}

export default MusicDisplay;