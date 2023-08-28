import React, { useEffect, useState } from 'react';
import SongsDisplay from './SongsDisplay';
import Button from './Button';
import { addUserLike, removeUserLike } from '../ServerFunctions/likesFunctions';
import { useCookies } from 'react-cookie';
import ArtistsDisplay from './ArtistsDisplay';
import { fetchFullDetails } from '../ServerFunctions/MusicalObjectsFunctions';
import AlbumsDisplay from './AlbumsDisplay';

const MusicDisplay = ({artists, albums, songs}) => {
  const [ selectedCategory, setSelectedCategory ] = useState("Artists")
  const [ artistsDetails, setArtistsDetails ] = useState([]);
  const [ albumsDetails, setAlbumsDetails ] = useState([]);
  const [ songsDetails, setSongsDetails ] = useState([]);
  const [ cookies ] = useCookies(['userId'])
  const { userId } = cookies;

  const categoryComponents = {
      "Artists": <ArtistsDisplay artists={artistsDetails} />,
      "Albums": <AlbumsDisplay albums={albumsDetails} />,
      "Songs": <SongsDisplay
                  songItems={songsDetails}
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

  useEffect(() => {
    const fetchData = async () => {
      const [artistsItems, albumsItems, songsItems] = await fetchFullDetails(artists, albums, songs, userId);
      setArtistsDetails(artistsItems);
      setAlbumsDetails(albumsItems);
      setSongsDetails(songsItems);

    };
    fetchData();
  }, [])

  return (
    <div> <Button text="Artists" onClick={() => {setSelectedCategory("Artists")}}/>
          <Button text="Albums" onClick={() => {setSelectedCategory("Albums")}}/>
          <Button text="Songs" onClick={() => {setSelectedCategory("Songs")}}/>
          {categoryComponents[selectedCategory]}
    </div>
  )
}

export default MusicDisplay;