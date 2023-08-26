import axios from 'axios';
import { baseServerUrl, createIdsQuery } from './serverFunctions';

const likesServerUrl = `${baseServerUrl}/likes`

export const addUserLike = async (userId, musicalEntity) => {
  await axios.put(likesServerUrl, {
    Add: true,
    MusicalEntity: musicalEntity,
    UserId : userId,
  })}

export const removeUserLike = async (userId, objectId) => {
    try{
       await axios.put(likesServerUrl, {
        add: false,
        userId : userId,
        objectId : objectId
      })

    } catch(error){
      if (error.response.status === 404) {
          alert("user doesn't like post!")
      }
      throw(error);
    }
  }

export const fetchUsersLikes = async (userIds) =>
  (await axios.get(`${likesServerUrl}?usersIds=${userIds.join()}`)).data;

export const fetchUserLikes = async (userId) =>
  await fetchUsersLikes([userId])

export const createEmptyLikesArray = async (musicalEntity) =>
  (await axios.post(likesServerUrl, {MusicalEntity: musicalEntity})).data;