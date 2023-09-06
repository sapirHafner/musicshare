import React, { useState } from 'react';
import MyMusic from './MyMusic';
import Button from '../Common/Button';
import MyPosts from './MyPosts';
import ArtistBrowse from './ArtistBrowse';
import FollowersDisplay from './FollowersDisplay';

const ArtistHomeDisplay = ({artists, albums, songs}) => {
  const [ selectedCategory, setSelectedCategory ] = useState("MyMusic")
  const categoryComponents = {
      "MyMusic": <MyMusic />,
      "MyPosts": <MyPosts />,
      "Browse": <ArtistBrowse />,
      "Followers": <FollowersDisplay />
  }

  return (
    <div className='artisthomedisplay'>
      <div className='displaybuttons'>
          <Button text="My Music" selected={selectedCategory === "MyMusic"} onClick={() => {setSelectedCategory("MyMusic")}}/>
          <Button text="My Posts" selected={selectedCategory === "MyPosts"} onClick={() => {setSelectedCategory("MyPosts")}}/>
          <Button text="Browse" selected={selectedCategory === "Browse"} onClick={() => {setSelectedCategory("Browse")}}/>
          <Button text="Followers" selected={selectedCategory === "Followers"} onClick={() => {setSelectedCategory("Followers")}}/>
      </div>
      <div>
        {categoryComponents[selectedCategory]}
      </div>
    </div>
  )
}

export default ArtistHomeDisplay;