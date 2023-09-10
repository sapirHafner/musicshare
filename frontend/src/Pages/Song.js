import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAlbum } from '../Common/ServerFunctions/AlbumFunctions'
import { useCookies } from 'react-cookie'
import UserPage from '../Components/UserPage'
import LikeButton from '../Components/Buttons/LikeButton';
import ShareButton from '../Components/Buttons/ShareButton'
import { fetchFullDetails } from '../Common/ServerFunctions/MusicalEntitiesFunctions'
import { fetchMusicalEntityPosts, enrichPosts } from '../Common/ServerFunctions/PostsFunctions'
import PostsList from '../Components/Lists/PostsList'
import { fetchSong } from '../Common/ServerFunctions/SongFunctions'
import { addUserLike, removeUserLike } from '../Common/ServerFunctions/likesFunctions'
import { useNavigate } from 'react-router-dom'
import Link from '../Components/Link'

const Song = () => {
  const { songId } = useParams();
  const [ song, setSong ] = useState();
  const [ album, setAlbum ] = useState();
  const [ artist, setArtist ] = useState();
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ posts, setPosts ] = useState()
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSong = await fetchSong(songId)
      const fetchedAlbum = await fetchAlbum(fetchedSong.albumId);
      const [fetchedArtists, fetchedAlbums, fetchedSongs] = await fetchFullDetails(userId, [fetchedAlbum.artistId], [fetchedAlbum._id], [fetchedSong._id])
      setSong(fetchedSongs[0]);
      setAlbum(fetchedAlbums[0])
      setArtist(fetchedArtists[0]);
      const postsAboutSong = await fetchMusicalEntityPosts(songId)
      setPosts(await enrichPosts(postsAboutSong, userId));
      console.log(fetchedSong)
      setIsLoaded(true)
    };
    fetchData()
  }, [])

  return (
    <UserPage isLoaded={isLoaded} component={
        isLoaded && <>
            <div className='content header'>
              <div>
                <div className='albumName'>song</div>
                <div className='title'>
                  {song.name}
                  <Link text={album.name} url={`/album/${album._id}`}/>
                  <Link text={artist.name} url={`/artist/${artist._id}`}/>
                </div>
              </div>
              <div className='functions'>
                  <LikeButton isLiked={song.liked} likesNumber={song.likesNumber} onLike={() => addUserLike(userId, song._id)} onDislike={() => removeUserLike(userId, song._id)}/>
                  <ShareButton onShare={() => navigate(`/newpost?type=song&id=${songId}`)} />
              </div>
            </div>
            <PostsList posts={posts} />
        </>
    }
  />
  )
}

export default Song;