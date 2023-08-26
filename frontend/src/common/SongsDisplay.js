import React from 'react'
import Song from './Song';

const SongsDisplay = ({ songItems, onLiked, onDisliked }) => {
  const songsForDisplay = songItems.map(songItem =>
    <Song id = {songItem["_id"]}
          name={songItem.Name}
          artist = {songItem.Artist}
          album = {songItem.Album}
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
