import React, { useEffect, useState } from 'react';
import SongsDisplay from './SongsDisplay';
import Button from './Button';
import { addUserLike, removeUserLike } from '../ServerFunctions/likesFunctions';
import { useCookies } from 'react-cookie';
import ArtistsDisplay from './ArtistsDisplay';
import AlbumsDisplay from './AlbumsDisplay';

const MusicDisplay = ({artists, albums, songs}) => {
  const [ selectedCategory, setSelectedCategory ] = useState("Artists")
  const [ cookies ] = useCookies(['userId'])
  const { userId } = cookies;
  const categoryComponents = {
      "Artists": <ArtistsDisplay artists={artists} />,
      "Albums": <AlbumsDisplay albums={albums} />,
      "Songs": <SongsDisplay
                  songs={songs}
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
    <div className='musicdisplay'>
          <Button text="Artists" selected={selectedCategory === "Artists"} onClick={() => {setSelectedCategory("Artists")}}/>
          <Button text="Albums" selected={selectedCategory === "Albums"} onClick={() => {setSelectedCategory("Albums")}}/>
          <Button text="Songs" selected={selectedCategory === "Songs"} onClick={() => {setSelectedCategory("Songs")}}/>
          {categoryComponents[selectedCategory]}
    </div>
  )
}

export default MusicDisplay;