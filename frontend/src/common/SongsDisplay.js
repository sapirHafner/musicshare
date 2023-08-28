import React from 'react'
import Song from './Song';

const SongsDisplay = ({ songs, onLiked, onDisliked }) => {
  const songsForDisplay = songs.map(song =>
    <Song song={song}
          onLiked = {onLiked}
          onDisliked = {onDisliked}
     />
  );
  return (
    <div>
      {songsForDisplay}
    </div>
  );
};

export default SongsDisplay;
