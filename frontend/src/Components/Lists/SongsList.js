import React from 'react'
import SongListItem from './Items/SongListItem'

const SongsList = ({ songs }) => {
  const songsComponents = songs.map(song => <SongListItem song={song}/>);

  return (
    <ul>
      {songsComponents}
    </ul>
  );
};

export default SongsList;
