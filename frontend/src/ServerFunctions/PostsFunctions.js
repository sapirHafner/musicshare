import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUserProfileBox } from './ProfilesFunctions';
import { getTypeIds } from '../Common/Utilities';
import { fetchArtist, fetchArtistByUserId } from './ArtistFunctions';
import { fetchFullDetails } from './MusicalEntitiesFunctions';
import { createEntitiesIdsDictionary } from '../Common/Utilities';
import { fetchUserType } from './UserFunctions';
import { fetchFriends } from './FriendsFunctions';
import { fetchUserFollows } from './followersFunctions';
const postServerUrl = `${baseServerUrl}/post`

export const createNewPost = async (post) =>
    await axios.post(postServerUrl, post);

export const fetchUsersPosts = async (usersIds) =>
  (await axios.get(`${postServerUrl}?orderby=createdat_desc&userIds=${usersIds.join()}`)).data;

export const fetchUserPosts = async (userId) =>
    await fetchUsersPosts([userId]);

export const fetchPostsFullDetails = async (id, currentUserId) => {
  const posts = await fetchUserPosts(id)
  let artistsIds = getTypeIds(posts, "artist");
  let albumsIds = getTypeIds(posts, "album");
  let songsIds = getTypeIds(posts, "song");
  const [artistsItems, albumsItems, songsItems] = await fetchFullDetails(currentUserId, artistsIds, albumsIds, songsIds);
  const musicalEntities = createEntitiesIdsDictionary([...artistsItems, ...albumsItems, ...songsItems])
  return await Promise.all(posts.map(async post => {
    const userType = await fetchUserType(post.UserId);
    return {
      ...post,
      User: {
        userType,
        info: userType === "user" ? await fetchUserProfileBox(post.UserId) : await fetchArtistByUserId(post.UserId)
      },
      MusicalEntity: {
        Type: post.MusicalEntity.Type,
        entity: musicalEntities[post.MusicalEntity.Id]
      }
    }
  }))
}

export const fetchFeedPosts = async (userId) => {
  const friends = await fetchFriends(userId);
  const follows = await fetchUserFollows(userId);

  let posts = await Promise.all(follows.map(async (follow) => {
    const followUserId = (await (fetchArtist(follow.artistId))).UserId;
    const followPosts = await fetchPostsFullDetails(followUserId);
    return followPosts.map(post => { return {
      type: 'follow',
      post
    }})
  }))

  posts = posts.flatMap(innerArray => innerArray);
  posts = posts.sort((a, b) => new Date(b.post.CreatedAt) - new Date(a.post.CreatedAt))
  return posts;
}

