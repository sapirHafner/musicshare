import React, { useEffect, useState } from 'react'
import TopBar from '../Components/TopBar'
import UserNavigationBar from '../Components/UserNavigationBar'
import { useParams } from 'react-router-dom'
import { fetchAlbum } from '../Common/ServerFunctions/AlbumFunctions'
import LoadingScreen from '../Components/LoadingScreen'
import { useCookies } from 'react-cookie'
import LikeButton from '../Components/Buttons/LikeButton';
import ShareButton from '../Components/Buttons/ShareButton'
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'
import { fetchMusicalEntityPosts, enrichPosts } from '../Common/ServerFunctions/PostsFunctions'
import PostsList from '../Components/Lists/PostsList'
import { fetchSong } from '../Common/ServerFunctions/SongFunctions'
import { addSongLike, removeSongLike } from '../Common/ServerFunctions/likesFunctions'
import { useNavigate } from 'react-router-dom'

const Song = () => {
  const { songId } = useParams();
  const [ song, setSong ] = useState();
  const [ loaded, setLoaded ] = useState(false);
  const [ isLiked, setIsLiked ] = useState(false);
  const [ posts, setPosts ] = useState()
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  const navigate = useNavigate();

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
    <TopBar />
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
                  <ShareButton onShare={() => navigate(`/newpost?type=song&id=${songId}`)} />
                </div>
              </div>
              <PostsList posts={posts} />
            </>
          :
          <LoadingScreen />
        }
    </div>
  </div>
  )
}

export default Song;