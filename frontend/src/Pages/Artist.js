import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'

import UserPage from '../Components/UserPage'

import { fetchArtist } from '../Common/ServerFunctions/ArtistFunctions'
import { fetchAlbums } from '../Common/ServerFunctions/AlbumFunctions'
import {  isUserLiking, addUserLike, removeUserLike, getEntityLikesNumber } from '../Common/ServerFunctions/likesFunctions'
import { isUserFollowing, addFollower, removeFollower } from '../Common/ServerFunctions/followersFunctions'
import { enrichPosts, fetchMusicalEntityPosts, fetchUserPosts } from '../Common/ServerFunctions/PostsFunctions'
import ArtistProfile from '../Components/ArtistProfile'

const Artist = () => {
  const [cookies] = useCookies(['userId']);
  const navigate = useNavigate()
  const { userId, userType } = cookies;
  const { artistId } = useParams();

  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [posts, setPosts ] = useState();
  const [artistPosts, setArtistPosts] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedArtist = await fetchArtist(artistId);
      fetchedArtist.liked = await isUserLiking(userId, artistId);
      fetchedArtist.followed = await isUserFollowing(userId, artistId);
      fetchedArtist.likesNumber = await getEntityLikesNumber(artistId);
      setArtist(fetchedArtist);
      setAlbums(await fetchAlbums(fetchedArtist.albumsIds));
      const postsAboutArtists = await fetchMusicalEntityPosts(artistId)
      setPosts(await enrichPosts(postsAboutArtists, userId));
      setArtistPosts(await enrichPosts(await fetchUserPosts(fetchedArtist.userId), userId))
      setIsLoaded(true)

    };
    fetchData()
  }, [])

  return (
      <UserPage isLoaded={isLoaded} component= {isLoaded &&
        <ArtistProfile artist={artist}
                      albums={albums}
                      posts={posts}
                      artistPosts={artistPosts}
                      onLike={() => addUserLike(userId, artist._id)}
                      onDislike={() => removeUserLike(userId, artist._id)}
                      onFollow={() => addFollower(artist._id, userId)}
                      onUnfollow={() => removeFollower(artist._id, userId)}
                      onShare={() => navigate(`/newpost?type=artist&id=${artist._id}`)}
          />} />
  )
}

export default Artist;