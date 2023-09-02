import React, { useState } from 'react';
import SongsDisplay from './SongsDisplay';
import Button from './Button';
import ArtistsDisplay from './ArtistsDisplay';
import AlbumsDisplay from './AlbumsDisplay';

const MusicDisplay = ({artists, albums, songs, type}) => {
  const [ selectedCategory, setSelectedCategory ] = useState("Artists")
  const categoryComponents = {
      "Artists": <ArtistsDisplay artists={artists} type={type}/>,
      "Albums": <AlbumsDisplay albums={albums} type={type}/>,
      "Songs": <SongsDisplay songs={songs} type={type}/>
  }

  return (
    <div className='musicdisplay'>
      <div className='displaybuttons'>
          <Button text="Artists" selected={selectedCategory === "Artists"} onClick={() => {setSelectedCategory("Artists")}}/>
          <Button text="Albums" selected={selectedCategory === "Albums"} onClick={() => {setSelectedCategory("Albums")}}/>
          <Button text="Songs" selected={selectedCategory === "Songs"} onClick={() => {setSelectedCategory("Songs")}}/>
      </div>
      <div>
        {categoryComponents[selectedCategory]}
      </div>
    </div>
  )
}

export default MusicDisplay;