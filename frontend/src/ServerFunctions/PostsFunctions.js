import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchMusicalObject } from './MusicalObjectsFunctions';
import { fetchUserProfileBox } from './ProfilesFunctions';

const postServerUrl = `${baseServerUrl}/post`

export const createNewPost = async (post) =>
    await axios.post(postServerUrl, post);

export const fetchUserPosts = async (userId) => {
  const response = await axios.get(`${postServerUrl}/user/${userId}`);
  const userPosts = await Promise.all(response.data.map(async post => {
    const user = await fetchUserProfileBox(post.UserId)
    const musicalObject = await fetchMusicalObject(post.MusicalObject.Type, post.MusicalObject.Id)
    return {
      title: post.Title,
      content: post.Content,
      user,
      musicalObject
    }
  }));
  return userPosts;
}