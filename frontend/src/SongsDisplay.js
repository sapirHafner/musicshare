import React from 'react'

const SongsDisplay = ({songItems}) => {
  const songsForDisplay = songItems.map( songItem =>
    <div>
      <h1>name: {songItem.name} </h1>
      <h2>album: {songItem.album}</h2>
      <h2>artist: {songItem.artist}</h2>
    </div>
  );
  return (
    <div>
      {songsForDisplay}
    </div>
  );
};

export default SongsDisplay;
