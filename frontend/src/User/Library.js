import React from 'react'
import UserNavigationBar from './UserNavigationBar';
import SongsDisplay from '../Common/SongsDisplay';
import { fetchUserLikes, addUserLike, removeUserLike } from '../ServerFunctions/likesFunctions';
import { fetchSongs } from '../ServerFunctions/SongFunctions';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import LoadingScreen from '../Common/LoadingScreen';
import MusicDisplay from '../Common/MusicDisplay';
import { fetchArtists } from '../ServerFunctions/ArtistFunctions';
import { useParams } from 'react-router-dom';
import { setEntitiesLikes } from '../Common/Utilities';

const Library = () => {
    const [likedArtists, setLikedArtists] = useState([]);
    const [likedAlbums, setLikedAlbums] = useState([]);
    const [likedSongs, setLikedSongs] = useState([]);
    const [likes, setLikes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { id } = useParams();
    const [ cookies ] = useCookies()
    const { userId } = cookies

    useEffect(() => {
      const fetchData = async () => {
        const userLikes = await fetchUserLikes(id)
        const currentUserLikes = await fetchUserLikes(userId)
   //     setLikedArtists(await fetchArtists(userLikes.filter(like => like.MusicalEntity.Type === "artist").map(like => like.MusicalEntity.Id)));
     //  setLikedAlbums(await fetchLikedAlbums(userLikes.filter(like => like.MusicalEntity.Type === "album").map(like => like.MusicalEntity.Id)));
        const songsIds = userLikes.filter(like => like.MusicalEntity.Type === "song").map(like => like.MusicalEntity.Id)
        setLikedSongs(setEntitiesLikes(await fetchSongs(songsIds), currentUserLikes));
        setIsLoaded(true);
      }
      fetchData();
    }, [])
    return (
      <div>
        <UserNavigationBar selectedItem="Library"/>
        {
          isLoaded ?
            <MusicDisplay songs={likedSongs} />
          :
            <LoadingScreen />
        }
      </div>
    )
}

export default Library;