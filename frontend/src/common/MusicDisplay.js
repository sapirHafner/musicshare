import React, { useEffect, useState } from 'react';
import SongsDisplay from './SongsDisplay';
import Button from './Button';
import LoadingScreen from './LoadingScreen'
import { addUserLike, fetchUserLikes, removeUserLike } from '../ServerFunctions/likesFunctions';
import { useCookies } from 'react-cookie';

const MusicDisplay = ({songs}) => {
    const [ selectedCategory, setSelectedCategory ] = useState("Artists")
    const [ isLoaded, setIsLoaded ] = useState(false);

    const [ cookies ] = useCookies(['userId'])
    const { userId } = cookies;

    useEffect(() => {
      const fetchSongsData = async () => {
        const likedSongs = await fetchUserLikes(userId);
        songs.forEach(song => {
          song.liked = likedSongs.includes(song["_id"]);
        });
      }

      fetchSongsData();
      setIsLoaded(true);
    },[])


    const categoryComponents = {
        "Artists": <div> Artists! </div>,
        "Albums": <div> Albums! </div>,
        "Songs": <SongsDisplay
                    songItems={songs}
                    onLiked={(objectId) => addUserLike(userId, objectId)}
                    onDisliked={(objectId) => removeUserLike(userId, objectId)}
                    />
    }

  return (
    <div>
        {
          isLoaded ?
          <div> <Button text="Artists" onClick={() => {setSelectedCategory("Artists")}}/>
              <Button text="Albums" onClick={() => {setSelectedCategory("Albums")}}/>
              <Button text="Songs" onClick={() => {setSelectedCategory("Songs")}}/>
              {categoryComponents[selectedCategory]}
          </div>
          :
          <LoadingScreen />
        }
    </div>
  )
}

export default MusicDisplay;