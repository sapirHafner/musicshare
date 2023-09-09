import React from 'react'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import UserPage from '../Components/UserPage';
import MusicDisplay from '../Components/MusicDisplay';

import { getTypeIds } from '../Common/Utilities';
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'
import { fetchUserLikes } from '../Common/ServerFunctions/likesFunctions';
import { addUserLike, removeUserLike } from '../Common/ServerFunctions/likesFunctions'
import { addFollower, removeFollower } from '../Common/ServerFunctions/followersFunctions';
import { fetchUserProfileBox } from '../Common/ServerFunctions/ProfilesFunctions';
import ProfileBox from '../Components/Boxes/ProfileBox';

const Library = () => {
    const [profile, setProfile] = useState()
    const [likedArtists, setLikedArtists] = useState();
    const [likedAlbums, setLikedAlbums] = useState();
    const [likedSongs, setLikedSongs] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    const { id } = useParams();
    const [ cookies ] = useCookies()
    const { userId } = cookies
    const navigate = useNavigate()

    useEffect(() => {
      const fetchData = async () => {
        setProfile(await fetchUserProfileBox(id));
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
      <UserPage selectedNavItem={userId === id ? "library" : ""} isLoaded={isLoaded} component=
      <div>
        <ProfileBox profile={profile} />
        <MusicDisplay artists={likedArtists}
                      albums={likedAlbums}
                      songs={likedSongs}
                      onLike={(musicalEntity) => addUserLike(userId, musicalEntity)}
                      onDislike={(musicalEntity) => removeUserLike(userId, musicalEntity)}
                      onFollow={(artistId) => addFollower(artistId, userId)}
                      onUnollow={(artistId) => removeFollower(artistId, userId)}
                      onShare={(type, id) => navigate(`/newpost?type=${type}&id=${id}`)}
        />
      </div>
      />
    )
}

export default Library;

