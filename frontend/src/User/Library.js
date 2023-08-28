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
import { fetchFullDetails } from '../ServerFunctions/MusicalObjectsFunctions'

const Library = () => {
    const [likedArtists, setLikedArtists] = useState([]);
    const [likedAlbums, setLikedAlbums] = useState([]);
    const [likedSongs, setLikedSongs] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { id } = useParams();
    const [ cookies ] = useCookies()
    const { userId } = cookies

    useEffect(() => {
      const fetchData = async () => {
        const userLikes = await fetchUserLikes(id)
        const likedArtistsIds = getTypeIds(userLikes, "artist");
        const likedAlbumsIds = getTypeIds(userLikes, "album");
        const likedSongsIds = getTypeIds(userLikes, "song");
        const [artists, albums, songs] = await fetchFullDetails(userId, likedArtistsIds, likedAlbumsIds, likedSongsIds);
        setLikedArtists(artists);
        setLikedAlbums(albums);
        setLikedSongs(songs);
        setIsLoaded(true);
      }
      fetchData();
    }, [])
    return (
      <div className='grid-container'>
        <UserNavigationBar selectedItem="Library"/>
        <div className='content'>
        {
            isLoaded ?
              <MusicDisplay artists={likedArtists} albums={likedAlbums} songs={likedSongs} />
            :
              <LoadingScreen />
        }
        </div>
    </div>
    )
}

export default Library;
