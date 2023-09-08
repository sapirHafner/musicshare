import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'

import UserPage from '../Components/UserPage'
import AlbumBox from '../Components/Boxes/AlbumBox'
import PostsList from '../Components/Lists/PostsList'
import ArtistHeader from '../Components/Headers/ArtistHeader'

import { fetchArtist } from '../Common/ServerFunctions/ArtistFunctions'
import { fetchAlbums } from '../Common/ServerFunctions/AlbumFunctions'
import {  isUserLiking, addArtistLike, removeArtistLike, getEntityLikesNumber } from '../Common/ServerFunctions/likesFunctions'
import { isUserFollowing, addFollower, removeFollower } from '../Common/ServerFunctions/followersFunctions'
import { enrichPosts, fetchMusicalEntityPosts } from '../Common/ServerFunctions/PostsFunctions'

const Artist = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const { artistId } = useParams();

  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [posts, setPosts ] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedArtist = await fetchArtist(artistId);
      fetchedArtist.liked = await isUserLiking(userId, artistId);
      fetchedArtist.followed = await isUserFollowing(userId, artistId);
      fetchedArtist.likesNumber = await getEntityLikesNumber(artistId);
      setArtist(fetchedArtist);
      setAlbums(await fetchAlbums(fetchedArtist.AlbumsIds));
      const postsAboutArtists = await fetchMusicalEntityPosts(artistId)
      setPosts(await enrichPosts(postsAboutArtists, userId));
      setIsLoaded(true)
    };
    fetchData()
  }, [])

  const onLike = () => {
    const handleLike = async () => {
      try {
        setArtist({...artist, liked: true})
        await addArtistLike(userId, artist._id);
      } catch (error) {
        setArtist({...artist, liked: false})
      }
    };
    handleLike();
  }

  const onDislike = () => {
    const handleDislike = async () => {
      try {
        setArtist({...artist, liked: false})
        await removeArtistLike(userId, artist._id);
      } catch (error) {
        setArtist({...artist, liked: true})
      }
    };
    handleDislike();
  }

  const onFollow = () => {
    const handleFollow = async () => {
      try {
        setArtist({...artist, followed: true})
        await addFollower(artist._id, userId)
      } catch (error) {
        setArtist({...artist, followed: false})
      }
    };
    handleFollow();
  }

  const onUnfollow = () => {
    const handleFollow = async () => {
      try {
        setArtist({...artist, followed: false})
        await removeFollower(artist._id, userId)
      } catch (error) {
        setArtist({...artist, followed: true})
      }
    };
    handleFollow();
  }

  return (
    <UserPage isLoaded={isLoaded} component= {isLoaded &&
      <div className='artistcontainer'>
        <ArtistHeader artist={artist}
                      onLike={onLike}
                      onDislike={onDislike}
                      onFollow={onFollow}
                      onUnfollow={onUnfollow}
        />
        <div className='content albums'>
          {albums.map(album => <AlbumBox album={album} className="min"/>)}
        </div>
        <PostsList posts={posts} />
      </div>
    }/>
  )
}

export default Artist;