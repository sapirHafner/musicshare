import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUserProfileBox } from './ProfilesFunctions';
import { fetchArtist, fetchArtistByUserId } from './ArtistFunctions';
import { fetchFullDetails } from './MusicalEntitiesFunctions';
import { createEntitiesIdsDictionary, getTypeIds } from '../Utilities';
import { fetchUser } from './UserFunctions';
import { fetchFriends } from './FriendsFunctions';
import { fetchUserFollows } from './followersFunctions';

const postServerUrl = `${baseServerUrl}/post`

export const createNewPost = async (post) =>
    await axios.post(postServerUrl, post);

export const fetchUsersPosts = async (usersIds) =>
  (await axios.get(`${postServerUrl}?orderby=createdat_desc&userIds=${usersIds.join()}`)).data;

export const fetchUserPosts = async (userId) =>
  (await axios.get(`${postServerUrl}/user/${userId}/?orderby=createdat_desc`)).data;

export const enrichPosts = async (posts, currentUserId) => {
  let artistsIds = getTypeIds(posts, "artist");
  let albumsIds = getTypeIds(posts, "album");
  let songsIds = getTypeIds(posts, "song");
  const [artistsItems, albumsItems, songsItems] = await fetchFullDetails(currentUserId, artistsIds, albumsIds, songsIds);
  const musicalEntities = createEntitiesIdsDictionary([...artistsItems, ...albumsItems, ...songsItems])
  return await Promise.all(posts.map(async post => {
    const userType = (await fetchUser(post.userId)).type;
    return {
      ...post,
      user: {
        userType,
        info: userType === "user" ? await fetchUserProfileBox(post.userId) : await fetchArtistByUserId(post.userId)
      },
      musicalEntity: {
        type: post.musicalEntity.type,
        entity: musicalEntities[post.musicalEntity.id]
      }
    }
  }))
}

export const fetchFeedPosts = async (userId) => {

  const friends = await fetchFriends(userId);
  const follows = await fetchUserFollows(userId);

  let posts = [];
  posts.push(await Promise.all(follows.map(async (follow) => {
    const followUserId = (await (fetchArtist(follow.artistId))).userId;
    const followPosts = await enrichPosts(await fetchUserPosts(followUserId));
    return followPosts.map(post => { return {
      type: 'follow',
      post
    }})
  })));

  posts.push(await Promise.all(friends.map(async (friend) => {
    const friendPosts = await enrichPosts(await fetchUserPosts(friend.userId));
    return friendPosts.map(post => { return {
      type: 'friend',
      post
    }})
  })))

  posts = posts.flatMap(innerArray => innerArray);
  posts = posts.flatMap(innerArray => innerArray);
  const songsIds = posts.map(_ => _.post).filter(_ => _.musicalEntity.type === "song").map(_ => _.musicalEntity.entity._id)
  const albumsIds = posts.map(_ => _.post).filter(_ => _.musicalEntity.type === "album").map(_ => _.musicalEntity.entity._id)
  const artistsIds = posts.map(_ => _.post).filter(_ => _.musicalEntity.type === "artist").map(_ => _.musicalEntity.entity._id)
  const [artists, albums, songs] = await fetchFullDetails(userId, artistsIds, albumsIds, songsIds);

  posts.forEach(post => {
    const id = post.post.musicalEntity.entity._id;
    const type = post.post.musicalEntity.type;
    if (type === "song") {
      post.post.musicalEntity.entity = songs.find(song => song._id === id)
    }
    else if (type === "album") {
      post.post.musicalEntity.entity = albums.find(album => album._id === id)
    }
    else if (type === "artist") {
      post.post.musicalEntity.entity = artists.find(artist => artist._id === id)
    }
  })
  posts = posts.sort((a, b) => new Date(b.post.createdAt) - new Date(a.post.createdAt));
  return posts;
}

export const fetchMusicalEntityPosts = async (musicalEntityId) =>
  (await axios.get(`${postServerUrl}/${musicalEntityId}?orderby=createdat_desc`)).data;

export const deleteUserPosts = async (userId) =>
  (await axios.delete(`${postServerUrl}?userId=${userId}`))

export const deleteMusicalEntityPosts = async (musicalEntityId) =>
  (await axios.delete(`${postServerUrl}?musicalEntityId=${musicalEntityId}`))