import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const likesServerUrl = `${baseServerUrl}/likes`

export const addUserLike = async (userId, musicalEntity) =>{
  await axios.put(likesServerUrl, {
    add: true,
    musicalEntity,
    userId,
  })}

export const removeUserLike = async (userId, musicalEntity) =>
  await axios.put(likesServerUrl, {
    add: false,
    musicalEntity,
    userId
  })

export const deleteUserLikes = async (userId) =>
  await axios.delete(`${likesServerUrl}?userId=${userId}`)

export const fetchEntityLikes = async (musicalEntityId) =>
  (await axios.get(`${likesServerUrl}/${musicalEntityId}`)).data.usersIds;

export const deleteMusicalEntityLikes = async (musicalEntityId) =>
  axios.delete(`${likesServerUrl}/${musicalEntityId}`)

export const getEntityLikesNumber = async (musicalEntityId) =>
  (await fetchEntityLikes(musicalEntityId)).length;

export const fetchUserLikes = async (userId) =>
  (await axios.get(`${likesServerUrl}/user/${userId}`)).data

export const createEmptyLikesArray = async (musicalEntity) =>
  (await axios.post(likesServerUrl, {musicalEntity})).data;

export const addSongLike = async (userId, songId) =>
  await addUserLike(userId, {
      type: "song",
      id: songId
    });

export const removeSongLike = async (userId, songId) =>
  await removeUserLike(userId, {
      type: "song",
      id: songId,
    })

export const addAlbumLike = async (userId, albumId) =>
  await addUserLike(userId, {
      type: "album",
      id: albumId
    });

export const removeAlbumLike = async (userId, albumId) =>
  await removeUserLike(userId, {
      type: "album",
      id: albumId
    });

export const addArtistLike = async (userId, artistId) =>
  await addUserLike(userId, {
    type: "artist",
    id: artistId
  });

export const removeArtistLike = async (userId, artistId) =>
  await removeUserLike(userId, {
      type: "artist",
      id: artistId
    });

export const isUserLiking = async (userId, musicalEntityId) => {
  const userLikes = (await fetchUserLikes(userId)).map(like => like.MusicalEntity.Id)
  return userLikes.includes(musicalEntityId);
}
