import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Button from '../Buttons/Button'
import Display from '../Display'
import MusicDisplay from '../MusicDisplay'
import ArtistProfile from '../ArtistProfile'
import FollowersList from '../Lists/FollowersList'
import NewAlbumForm from '../Forms/NewAlbumForm'

import { fetchFullDetails } from '../../Common/ServerFunctions/MusicalEntitiesFunctions'
import { fetchArtist } from '../../Common/ServerFunctions/ArtistFunctions'
import { deleteAlbum, fetchAlbums } from '../../Common/ServerFunctions/AlbumFunctions'
import { fetchUserPosts, enrichPosts } from '../../Common/ServerFunctions/PostsFunctions'
import { addAlbumAndSongsToArtist } from '../../Common/ServerFunctions/AlbumFunctions'
import { getFeatureFlag  } from '../../Common/ServerFunctions/featureFlagsFunctions';
import { deleteUser } from '../../Common/ServerFunctions/UserFunctions'

const ArtistHome = () => {
  const [cookies] = useCookies();
  const { userId, artistId } = cookies;
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);

  const [artist, setArtist] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState();
  const [posts, setPosts ] = useState([]);

  const [imagesFeatureFlags, setImagesFeatureFlags] = useState()

  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [ artists, albums, songs ] = await fetchFullDetails();
      setAllArtists(artists);
      setAllAlbums(albums);
      setAllSongs(songs);

      const fetchedArtist = await fetchArtist(artistId);
      setArtist(fetchedArtist);
      setArtistAlbums(await fetchAlbums(fetchedArtist.albumsIds));
      setPosts(await enrichPosts(await fetchUserPosts(userId)))
      setImagesFeatureFlags(await getFeatureFlag("images"))
      setIsLoaded(true);
    }
    fetchData();
  }, [])

  return (
  <div className='grid-container'>
      <div className='topbar'>
        <div className='clickable' onClick={() => navigate('/home')}>
            <span className="glow"> MusicShare </span>
        </div>
        <div>
          <span className='clickable' style={{color: "red"}} onClick={() => navigate('/logout')}>
            logout
          </span>
          <Button text="delete" onClick={() => {
                deleteUser(userId, "artist");
                navigate('/logout')
            }}/>
        </div>

    </div>
    <div className='main'>
        <div className='content'>
            <h1>Welcome to MusicShare</h1>
            <h3>This is the artist home page</h3>
            {
              isLoaded ?
                <Display components={{
                    "Profile": <ArtistProfile artist={artist}
                                              albums={artistAlbums}
                                              artistPosts={posts}
                                              onDeleteAlbum={deleteAlbum}
                                              />,
                    "Browse": <MusicDisplay
                                artists={allArtists}
                                albums={allAlbums}
                                songs={allSongs}
                                onShare={(type, id) => navigate(`/newpost?type=${type}&id=${id}`)}
                    />,
                    "Followers": <FollowersList />,
                    "Add Album": <NewAlbumForm uploadImage={imagesFeatureFlags} onSubmit={(album, songs) => {
                      addAlbumAndSongsToArtist(artistId, album, songs)
                      navigate('/')
                    }} />
                }} />
              :
              (<p>loading...</p>)
            }

        </div>
    </div>
  </div>
  )
}

export default ArtistHome