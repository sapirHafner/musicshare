import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const postServerUrl = `${baseServerUrl}/post`

export const createNewPost = async (post) =>
    await axios.post(postServerUrl, post);

export const fetchUsersPosts = async (usersIds) =>
  (await axios.get(`${postServerUrl}?userIds=${usersIds.join()}`)).data;

export const fetchUserPosts = async (userId) =>
    await fetchUsersPosts([userId]);