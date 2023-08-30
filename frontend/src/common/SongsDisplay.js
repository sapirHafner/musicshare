import React from 'react'
import SongListItem from './SongListItem'

const SongsDisplay = ({ songs }) => {
  const songsComponents = songs.map(song => <SongListItem song={song}/>);

  return (
    <ul>
      {songsComponents}
    </ul>
  );
};

export default SongsDisplay;
