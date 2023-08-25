import React, { useState } from 'react';
import SongsDisplay from './SongsDisplay';
import Button from './Button';
const MusicDisplay = ({songs}) => {
    const [ selectedCategory, setSelectedCategory ] = useState("Artists")
    const categoryComponents = {
        "Artists": <div> Artists! </div>,
        "Albums": <div> Albums! </div>,
        "Songs": <SongsDisplay songItems={songs}/>
    }

  return (
    <div>
        Music Display!
        <div> <Button text="Artists" onClick={() => {setSelectedCategory("Artists")}}/>
              <Button text="Albums" onClick={() => {setSelectedCategory("Albums")}}/>
              <Button text="Songs" onClick={() => {setSelectedCategory("Songs")}}/>
        </div>
        {categoryComponents[selectedCategory]}
    </div>
  )
}

export default MusicDisplay;