import React from 'react'
import Song from './Song';

const SongsDisplay = ({ songItems, onLiked, onDisliked }) => {
  const songsForDisplay = songItems.map(songItem =>
    <Song song={songItem}
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
