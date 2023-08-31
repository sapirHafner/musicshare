import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const likesServerUrl = `${baseServerUrl}/likes`

export const addUserLike = async (userId, musicalEntity) =>{
  await axios.put(likesServerUrl, {
    Add: true,
    MusicalEntity: musicalEntity,
    UserId : userId,
  })}

export const removeUserLike = async (userId, musicalEntity) =>
  await axios.put(likesServerUrl, {
    Add: false,
    MusicalEntity : musicalEntity,
    UserId : userId
  })

export const fetchUsersLikes = async (userIds) =>
  (await axios.get(`${likesServerUrl}?usersIds=${userIds.join()}`)).data;

export const  fetchUserLikes = async (userId) =>
  await fetchUsersLikes([userId])

export const createEmptyLikesArray = async (musicalEntity) =>
  (await axios.post(likesServerUrl, {MusicalEntity: musicalEntity})).data;

export const addSongLike = async (userId, songId) =>
  await addUserLike(userId, {
      Type: "song",
      Id: songId
    });

export const removeSongLike = async (userId, songId) =>
  await removeUserLike(userId, {
      Type: "song",
      Id: songId,
    })

export const addAlbumLike = async (userId, albumId) =>
  await addUserLike(userId, {
      Type: "album",
      Id: albumId
    });

export const removeAlbumLike = async (userId, albumId) =>
  await removeUserLike(userId, {
      Type: "album",
      Id: albumId
    });

export const addArtistLike = async (userId, artistId) =>
  await addUserLike(userId, {
    Type: "artist",
    Id: artistId
  });

export const removeArtistLike = async (userId, artistId) =>
  await removeUserLike(userId, {
      Type: "artist",
      Id: artistId
    });