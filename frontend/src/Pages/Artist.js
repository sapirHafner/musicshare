import React, { useEffect, useState } from 'react'
import UserPage from '../Components/UserPage'
import { useParams } from 'react-router-dom'
import { fetchArtist } from '../Common/ServerFunctions/ArtistFunctions'
import { fetchAlbums } from '../Common/ServerFunctions/AlbumFunctions'
import AlbumBox from '../Components/Boxes/AlbumBox'
import { useCookies } from 'react-cookie'
import {  fetchUserLikes, addArtistLike, removeArtistLike } from '../Common/ServerFunctions/likesFunctions'
import { setEntitiesLikes } from '../Common/Utilities'
import FollowersButton from '../Components/Buttons/FollowersButton'
import LikeButton from '../Components/Buttons/LikeButton';
import ShareButton from '../Components/Buttons/ShareButton'
import { isUserFollowing, addFollower, removeFollower } from '../Common/ServerFunctions/followersFunctions'
import { enrichPosts, fetchMusicalEntityPosts } from '../Common/ServerFunctions/PostsFunctions'
import PostsList from '../Components/Lists/PostsList'

const Artist = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const { artistId } = useParams();

  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [posts, setPosts ] = useState();
  const [isLiked, setIsLiked] = useState();
  const [isFollowed, setIsFollowed] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userLikes = await fetchUserLikes(userId);
      const fetchedArtist = setEntitiesLikes([await fetchArtist(artistId)], userLikes)[0];
      setArtist(fetchedArtist);
      setAlbums(await fetchAlbums(fetchedArtist.AlbumsIds));
      setIsLiked(fetchedArtist.liked)
      setIsFollowed(await isUserFollowing(userId, artistId));
      const postsAboutArtists = await fetchMusicalEntityPosts(artistId)
      setPosts(await enrichPosts(postsAboutArtists, userId));
      setIsLoaded(true)
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
    <UserPage isLoaded={isLoaded} component= {isLoaded &&
      <div className='artistcontainer'>
        <div className='content header'>
          <div>
            <div className='albumName'>
              artist
            </div>
            <div>
              {artist.Name}
            </div>
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
        <PostsList posts={posts} />
      </div>
    }/>
  )
}

export default Artist;