import React, { useEffect, useState } from 'react'
import Upperbar from '../User/Upperbar'
import UserNavigationBar from '../User/UserNavigationBar'
import { useParams } from 'react-router-dom'
import { fetchAlbum } from '../ServerFunctions/AlbumFunctions'
import LoadingScreen from '../Common/LoadingScreen'
import { useCookies } from 'react-cookie'
import { addAlbumLike, removeAlbumLike } from '../ServerFunctions/likesFunctions'
import LikeButton from '../Components/LikeButton/LikeButton';
import ShareButton from '../Components/ShareButton/ShareButton'
import { fetchFullDetails } from '../ServerFunctions/MusicalEntitiesFunctions'
import SongsDisplay from './SongsDisplay'

const Album = () => {
  const { albumId } = useParams();
  const [ artist, setArtist ] = useState();
  const [ album, setAlbum ] = useState();
  const [ songs, setSongs ] = useState();
  const [ loaded, setLoaded ] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAlbum = await fetchAlbum(albumId)
      const [fetchedArtists, fetchedAlbums, fetchedSongs] = await fetchFullDetails(userId, [fetchedAlbum.ArtistId], [albumId], fetchedAlbum.SongIds)
      setArtist(fetchedArtists[0])
      setAlbum(fetchedAlbums[0])
      setSongs(fetchedSongs);
      setIsLiked(fetchedAlbum.liked)
      setLoaded(true)
    };
    fetchData()
  }, [])

  const onLike = () => {
    const handleLike = async () => {
      try {
        setIsLiked(true);
        await addAlbumLike(userId, album._id);
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
        await removeAlbumLike(userId, album._id);
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
                  <div className='albumName'>album</div>
                  <div className='title'>
                    {album.Name}
                  </div>
                </div>
                <div className='functions'>
                  <LikeButton isLiked={isLiked} onLike={onLike} onDislike={onDislike}/>
                  <ShareButton type="album" id={album._id} />
                </div>
              </div>
              <div className='content songs'>
                <SongsDisplay songs={songs} />
              </div>
            </>
          :
          <LoadingScreen />
        }
    </div>
  </div>
  )
}

export default Album;