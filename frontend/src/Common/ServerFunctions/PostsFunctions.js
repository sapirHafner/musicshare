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
  posts.sort((a, b) => new Date(b.post.CreatedAt) - new Date(a.post.CreatedAt));
  return posts;
}

export const fetchMusicalEntityPosts = async (musicalEntityId) =>
  (await axios.get(`${postServerUrl}/${musicalEntityId}`)).data;

export const deleteUserPosts = async (userId) =>
  (await axios.delete(`${postServerUrl}?userId=${userId}`))

export const deleteMusicalEntityPosts = async (musicalEntityId) =>
  (await axios.delete(`${postServerUrl}?musicalEntityId=${musicalEntityId}`))