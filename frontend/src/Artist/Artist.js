import React, { useEffect, useState } from 'react'
import Upperbar from '../User/Upperbar'
import UserNavigationBar from '../User/UserNavigationBar'
import { useParams } from 'react-router-dom'
import { fetchArtist } from '../ServerFunctions/ArtistFunctions'
import LoadingScreen from '../Common/LoadingScreen'
import { fetchAlbums } from '../ServerFunctions/AlbumFunctions'
import AlbumBox from '../Common/AlbumBox'
import { useCookies } from 'react-cookie'
import {  fetchUserLikes, addArtistLike, removeArtistLike } from '../ServerFunctions/likesFunctions'
import { setEntitiesLikes } from '../Common/Utilities'
import FollowersButton from '../Components/FollowersButton/FollowersButton'
import LikeButton from '../Components/LikeButton/LikeButton';
import ShareButton from '../Components/ShareButton/ShareButton'
import { isUserFollowing, addFollower, removeFollower } from '../ServerFunctions/followersFunctions'

const Artist = () => {
  const { artistId } = useParams();
  const [ artist, setArtist ] = useState();
  const [ albums, setAlbums ] = useState();
  const [ loaded, setLoaded ] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;

  useEffect(() => {
    const fetchData = async () => {
      const userLikes = await fetchUserLikes(userId);
      const fetchedArtist = setEntitiesLikes([await fetchArtist(artistId)], userLikes)[0];
      setArtist(fetchedArtist);
      setAlbums(await fetchAlbums(fetchedArtist.AlbumsIds));
      setIsLiked(fetchedArtist.liked)
      setIsFollowed(await isUserFollowing(userId, artistId));
      setLoaded(true)
    };
    fetchData()
  }, [])

  const onLike = () => {
    const handleLike = async () => {
      try {
        setIsLiked(true);
        await addArtistLike(userId, artist._id);
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
        await removeArtistLike(userId, artist._id);
      } catch (error) {
        setIsLiked(true);
      }
    };
    handleDislike();
  }

  const onFollow = () => {
    const handleFollow = async () => {
      try {
        setIsFollowed(true);
        await addFollower(artistId, userId)
      } catch (error) {
        setIsFollowed(false);
      }
    };
    handleFollow();
  }

  const onUnfollow = () => {
    const handleFollow = async () => {
      try {
        setIsFollowed(false);
        await removeFollower(artistId, userId)
      } catch (error) {
        setIsFollowed(true);
      }
    };
    handleFollow();
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
              <div className='content artistheader'>
                <div>
                  <div className='albumName'>artist</div>
                  <div>{artist.Name}</div>
                </div>
                <div className='functions'>
                  <LikeButton isLiked={isLiked} onLike={onLike} onDislike={onDislike}/>
                  <FollowersButton isFollowed={isFollowed} onFollow={onFollow} onUnfollow={onUnfollow}/>
                  <ShareButton type="artist" id={artist._id} />
                </div>
              </div>
              <div className='content albums'>
                {albums.map(album => <AlbumBox album={album} className="min"/>)}
              </div>
            </>
          :
          <LoadingScreen />
        }
    </div>
  </div>
  )
}

export default Artist;