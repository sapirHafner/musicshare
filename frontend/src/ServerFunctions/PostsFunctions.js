import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUserProfileBox } from './ProfilesFunctions';
import { fetchMusicalObject } from './MusicalObjectsFunctions';

const postServerUrl = `${baseServerUrl}/post`

export const createNewPost = async (post) =>
    await axios.post(postServerUrl, post);

export const fetchUsersPosts = async (usersIds) =>
  (await axios.get(`${postServerUrl}?userIds=${usersIds.join()}`)).data;

export const fetchUserPosts = async (userId) =>
    await fetchUsersPosts([userId]);

export const enrichPosts = async (posts) => {
  return await Promise.all(posts.map(async post => {
    const user = await fetchUserProfileBox(post.UserId)
    const musicalObject = await fetchMusicalObject(post.MusicalObject)
    musicalObject.Type = post.MusicalObject.Type;
    return {
      ...post,
      User: user,
      MusicalObject: musicalObject
    }
  }))
}
