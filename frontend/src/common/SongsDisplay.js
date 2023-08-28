import React from 'react'
import SongBox from './SongBox';

const SongsDisplay = ({ songs }) => {
  const songsComponents = songs.map(song =>
    <SongBox song={song} />
  );
  return (
    <div>
      {songsComponents}
    </div>
  );
};

export default SongsDisplay;
