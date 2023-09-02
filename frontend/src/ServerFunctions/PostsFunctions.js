import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUserProfileBox } from './ProfilesFunctions';
import { getTypeIds } from '../Common/Utilities';
import { fetchArtistByUserId } from './ArtistFunctions';
import { fetchFullDetails } from './MusicalEntitiesFunctions';
import { createEntitiesIdsDictionary } from '../Common/Utilities';
import { fetchUserType } from './UserFunctions';
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

