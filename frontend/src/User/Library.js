import React from 'react'
import UserNavigationBar from './UserNavigationBar';
import { fetchUserLikes } from '../ServerFunctions/likesFunctions';
import { fetchSongs } from '../ServerFunctions/SongFunctions';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import LoadingScreen from '../Common/LoadingScreen';
import MusicDisplay from '../Common/MusicDisplay';
import { fetchArtists } from '../ServerFunctions/ArtistFunctions';
import { useParams } from 'react-router-dom';
import { getTypeIds } from '../Common/Utilities';
import { fetchAlbums } from '../ServerFunctions/AlbumFunctions';

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
        setLikedArtists(await fetchArtists(getTypeIds(userLikes, "artist")));
        setLikedAlbums(await fetchAlbums(getTypeIds(userLikes, "album")));
        setLikedSongs(await fetchSongs(getTypeIds(userLikes, "song")));
        setIsLoaded(true);
      }
      fetchData();
    }, [])
    return (
      <div>
        <UserNavigationBar selectedItem="Library"/>
        {
          isLoaded ?
            <MusicDisplay artists= {likedArtists} albums={[]} songs={likedSongs} />
          :
            <LoadingScreen />
        }
      </div>
    )
}

export default Library;