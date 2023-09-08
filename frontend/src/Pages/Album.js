import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'

import SongsList from '../Components/Lists/SongsList'
import PostsList from '../Components/Lists/PostsList'
import UserPage from '../Components/UserPage'

import { fetchAlbum } from '../Common/ServerFunctions/AlbumFunctions'
import { addAlbumLike, removeAlbumLike } from '../Common/ServerFunctions/likesFunctions'
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
      const [fetchedArtists, fetchedAlbums, fetchedSongs] = await fetchFullDetails(userId, [fetchedAlbum.ArtistId], [albumId], fetchedAlbum.SongIds)
      setAlbum({...fetchedAlbums[0], artist: fetchedArtists[0].Name})
      setSongs(fetchedSongs);
      const postsAboutAlbum = await fetchMusicalEntityPosts(albumId)
      setPosts(await enrichPosts(postsAboutAlbum, userId));
      setIsLoaded(true)
    };
    fetchData()
  }, [])

  const onLike = () => {
    const handleLike = async () => {
      try {
        setAlbum({...album, liked: true})
        await addAlbumLike(userId, album._id);
      } catch (error) {
        setAlbum({...album, liked: false})
      }
    };
    handleLike();
  }

  const onDislike = () => {
    const handleDislike = async () => {
      try {
        setAlbum({...album, liked: false})
        await removeAlbumLike(userId, album._id);
      } catch (error) {
        setAlbum({...album, liked: true})
      }
    };
    handleDislike();
  }

  return (
    <UserPage isLoaded={isLoaded} component=
      <div>
        <AlbumHeader album={album}
                    onLike={onLike}
                    onDislike={onDislike}/>
        <div className='content songs'>
          <SongsList songs={songs} />
        </div>
        <PostsList posts={posts} />
      </div>
    />
  )
}

export default Album;