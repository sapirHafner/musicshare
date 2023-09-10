import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'

import SongsList from '../Components/Lists/SongsList'
import PostsList from '../Components/Lists/PostsList'
import UserPage from '../Components/UserPage'

import { addUserLike, removeUserLike } from '../Common/ServerFunctions/likesFunctions'
import { fetchAlbum } from '../Common/ServerFunctions/AlbumFunctions'
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'
import { fetchMusicalEntityPosts, enrichPosts } from '../Common/ServerFunctions/PostsFunctions'
import AlbumHeader from '../Components/Headers/AlbumHeader';

const Album = () => {
  const { albumId } = useParams();
  const [ album, setAlbum ] = useState();
  const [ songs, setSongs ] = useState();
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ posts, setPosts ] = useState()
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAlbum = await fetchAlbum(albumId)
      const [fetchedArtists, fetchedAlbums, fetchedSongs] = await fetchFullDetails(userId, [fetchedAlbum.artistId], [albumId], fetchedAlbum.songsIds)
      setAlbum({...fetchedAlbums[0], artist: fetchedArtists[0].Name})
      setSongs(fetchedSongs);
      const postsAboutAlbum = await fetchMusicalEntityPosts(albumId)
      setPosts(await enrichPosts(postsAboutAlbum, userId));
      setIsLoaded(true)
    };
    fetchData()
  }, [])


  return (
    <UserPage isLoaded={isLoaded} component=
      <div>
        <AlbumHeader album={album}
                    onLike={() => addUserLike(userId, album._id)}
                    onDislike={() => removeUserLike(userId, album._id)}/>
        <div className='content songs'>
          <SongsList songs={songs}
                     onLike={(id) => addUserLike(userId, id)}
                     onDislike={(id) => removeUserLike(userId, id)}
          />
        </div>
        <PostsList posts={posts} />
      </div>
    />
  )
}

export default Album;