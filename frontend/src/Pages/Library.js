import React from 'react'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import UserPage from '../Components/UserPage';
import MusicDisplay from '../Components/MusicDisplay';

import { getTypeIds } from '../Common/Utilities';
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'
import { fetchUserLikes } from '../Common/ServerFunctions/likesFunctions';

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
      <UserPage selectedNavItem='library' isLoaded={isLoaded} component=
        <MusicDisplay artists={likedArtists} albums={likedAlbums} songs={likedSongs} />
      />
    )
}

export default Library;

