import React, { useEffect, useState } from 'react'
import Upperbar from '../User/Upperbar'
import UserNavigationBar from '../User/UserNavigationBar'
import { useParams } from 'react-router-dom'
import { fetchAlbum } from '../ServerFunctions/AlbumFunctions'
import LoadingScreen from '../Common/LoadingScreen'
import { useCookies } from 'react-cookie'
import LikeButton from '../Components/LikeButton/LikeButton';
import ShareButton from '../Components/ShareButton/ShareButton'
import { fetchFullDetails } from '../ServerFunctions/MusicalEntitiesFunctions'
import { fetchMusicalEntityPosts, enrichPosts } from '../ServerFunctions/PostsFunctions'
import PostsDisplay from './PostsDisplay'
import { fetchSong } from '../ServerFunctions/SongFunctions'
import { addSongLike, removeSongLike } from '../ServerFunctions/likesFunctions'

const Song = () => {
  const { songId } = useParams();
  const [ song, setSong ] = useState();
  const [ loaded, setLoaded ] = useState(false);
  const [ isLiked, setIsLiked ] = useState(false);
  const [ posts, setPosts ] = useState()
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSong = await fetchSong(songId)
      const fetchedAlbum = await fetchAlbum(fetchedSong.AlbumId);
      const [fetchedArtists, fetchedAlbums, fetchedSongs] = await fetchFullDetails(userId, [fetchedAlbum.ArtistId], [fetchedAlbum._id], [fetchedSong._id])
      setSong(fetchedSong);
      
      const postsAboutSong = await fetchMusicalEntityPosts(songId)
      setPosts(await enrichPosts(postsAboutSong, userId));
      setIsLiked(fetchedSong.liked)
      setLoaded(true)
    };
    fetchData()
  }, [])

  const onLike = () => {
    const handleLike = async () => {
      try {
        setIsLiked(true);
        await addSongLike(userId, song._id);
      } catch (error) {
        setIsLiked(false);
      }
    };
    handleLike();
  }

  const onDislike = () => {
    const handleDislike = async () => {
      try {
        setIsLiked(false);
        await removeSongLike(userId, song._id);
      } catch (error) {
        setIsLiked(true);
      }
    };
    handleDislike();
  }

  return (
    <div className='grid-container'>
    <Upperbar />
    <div className='sidebar'>
        <UserNavigationBar />
    </div>
    <div className='main'>
        {
          loaded
          ?
            <>
              <div className='content header'>
                <div>
                  <div className='albumName'>song</div>
                  <div className='title'>
                    {song.Name}
                  </div>
                </div>
                <div className='functions'>
                  <LikeButton isLiked={isLiked} onLike={onLike} onDislike={onDislike}/>
                  <ShareButton type="song" id={song._id} />
                </div>
              </div>
              <PostsDisplay posts={posts} />
            </>
          :
          <LoadingScreen />
        }
    </div>
  </div>
  )
}

export default Song;