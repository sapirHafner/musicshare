import React, { useEffect, useState } from 'react'
import UserPage from '../Components/UserPage'
import { useNavigate } from 'react-router-dom';

import MusicDisplay from '../Components/MusicDisplay'
import { useCookies } from 'react-cookie';
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'
import { addUserLike, removeUserLike } from '../Common/ServerFunctions/likesFunctions'
import { addFollower, removeFollower } from '../Common/ServerFunctions/followersFunctions';

const Browse = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const navigate = useNavigate();

  const [allArtists, setAllArtists] = useState();
  const [allAlbums, setAllAlbums] = useState();
  const [allSongs, setAllSongs] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Artists")

  useEffect(() => {
    const fetchData = async () => {
      const [ artists, albums, songs ] = await fetchFullDetails(userId);
      setAllArtists(artists);
      setAllAlbums(albums);
      setAllSongs(songs);
      setIsLoaded(true);
    }
    fetchData();
  }, [userId, selectedCategory])

  const onChange = (category) => setSelectedCategory(category)
  
  return (
    <UserPage selectedNavItem='browse' isLoaded={isLoaded} component=
      <div>
        <h2>What music would you like to listen to today?</h2>
        <MusicDisplay artists={allArtists}
                      albums={allAlbums}
                      songs={allSongs}
                      onLike={(musicalEntity) => addUserLike(userId, musicalEntity)}
                      onDislike={(musicalEntity) => removeUserLike(userId, musicalEntity)}
                      onFollow={(artistId) => addFollower(artistId, userId)}
                      onUnfollow={(artistId) => removeFollower(artistId, userId)}
                      onShare={(type, id) => navigate(`/newpost?type=${type}&id=${id}`)}
                      onChange={onChange}
                      />
      </div>
    />
  )
}

export default Browse