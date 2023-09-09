import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import TopBar from '../TopBar'
import Display from '../Display'
import MusicDisplay from '../MusicDisplay'
import ArtistProfile from '../ArtistProfile'

import { fetchFullDetails } from '../../Common/ServerFunctions/MusicalEntitiesFunctions'
import { fetchArtist } from '../../Common/ServerFunctions/ArtistFunctions'
import { fetchAlbums } from '../../Common/ServerFunctions/AlbumFunctions'
import { fetchUserPosts, enrichPosts } from '../../Common/ServerFunctions/PostsFunctions'

const ArtistHome = () => {
  const [cookies] = useCookies();
  const { userId, artistId } = cookies;
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);

  const [artist, setArtist] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState();
  const [posts, setPosts ] = useState([]);

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
      setIsLoaded(true);
    }
    fetchData();
  }, [])

  return (
  <div className='grid-container'>
  <TopBar type="artist" />
    <div className='main'>
        <div className='content'>
            <h1>Welcome to MusicShare</h1>
            <h3>This is the artist home page</h3>
            {
              isLoaded ?
                <Display components={{
                    "Profile": <ArtistProfile artist={artist}
                                              albums={artistAlbums}
                                              posts={posts}/>,
                    "Browse": <MusicDisplay
                                artists={allArtists}
                                albums={allAlbums}
                                songs={allSongs}
                                onShare={(type, id) => navigate(`/newpost?type=${type}&id=${id}`)}
                    />
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