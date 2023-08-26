import React, { useEffect, useState } from 'react';
import SongsDisplay from './SongsDisplay';
import Button from './Button';
import { addUserLike, fetchUserLikes, removeUserLike } from '../ServerFunctions/likesFunctions';
import { useCookies } from 'react-cookie';

const MusicDisplay = ({songs}) => {
  const [ selectedCategory, setSelectedCategory ] = useState("Artists")
  const [ cookies ] = useCookies(['userId'])
  const { userId } = cookies;

  const categoryComponents = {
      "Artists": <div> Artists! </div>,
      "Albums": <div> Albums! </div>,
      "Songs": <SongsDisplay
                  songItems={songs}
                  onLiked={(songId) => addUserLike(userId, {
                    Type: "song",
                    Id: songId,
                  })}
                  onDisliked={(songId) => removeUserLike(userId, {
                    Type: "song",
                    Id: songId,
                  })}
                  />
  }

  return (
    <div> <Button text="Artists" onClick={() => {setSelectedCategory("Artists")}}/>
          <Button text="Albums" onClick={() => {setSelectedCategory("Albums")}}/>
          <Button text="Songs" onClick={() => {setSelectedCategory("Songs")}}/>
          {categoryComponents[selectedCategory]}
    </div>
  )
}

export default MusicDisplay;