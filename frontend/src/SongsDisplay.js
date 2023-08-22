import React from 'react'
import Song from './Song';

const SongsDisplay = ({ songItems, onLiked, onDisliked }) => {
  const songsForDisplay = songItems.map(songItem =>
    <Song id = {songItem["_id"]}
          name={songItem.name}
          artist = {songItem.artist}
          album = {songItem.album}
          liked = {songItem.liked}
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
