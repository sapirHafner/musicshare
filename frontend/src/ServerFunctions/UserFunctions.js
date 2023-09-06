import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { deleteMusicalEntityLikes, deleteUserLikes } from './likesFunctions';
import { deleteUserPosts, deleteMusicalEntityPosts } from './PostsFunctions';
import { deleteUserFriendsRequests } from './FriendsRequestsFunctions';
import { deleteProfile } from './ProfilesFunctions';
import { deleteUserFriends } from './FriendsFunctions';
import { deleteArtist, fetchArtistByUserId } from './ArtistFunctions';
import { deleteArtistAlbums, fetchAlbum } from './AlbumFunctions';
import { deleteArtistFollowers, deleteUserFollows } from './followersFunctions';
import { deleteAlbumSongs } from './SongFunctions';

const usersServerUrl = `${baseServerUrl}/users`

export const addUser = async (user) => {
    try {
      const response = await axios.post(usersServerUrl, user)
      return response.data;
    }
    catch (error) {
      if (error.response.status === 400){
        alert("user name already exists")
      }
      throw (error);
    }
}

export const getUser = async (username, password) => {
    const response = await axios.get(usersServerUrl, {
        params: {
            Username: username,
            Password: password
        }
    });
    return response.data;
};

export const getAllUsers = async () =>
  (await axios.get(usersServerUrl)).data;

export const deleteUser = async (userId, userType) => {
  await axios.delete(`${usersServerUrl}/${userId}`);
  await deleteUserPosts(userId);
  if (userType === "user") {
    await deleteUserLikes(userId);
    await deleteUserFriendsRequests(userId);
    await deleteUserFollows(userId);
    await deleteProfile(userId);
    await deleteUserFriends(userId);
  } else if (userType === "artist") {
    const artist = (await fetchArtistByUserId(userId));
    await deleteArtist(artist._id);
    await deleteArtistFollowers(artist._id);
    await deleteMusicalEntityLikes(artist._id);
    await deleteMusicalEntityPosts(artist._id);
    await Promise.all(artist.AlbumsIds.map(async albumId => {
      const album = await fetchAlbum(albumId);
      await deleteMusicalEntityLikes(albumId);
      await deleteMusicalEntityPosts(albumId);
      await deleteAlbumSongs(albumId);
      await Promise.all(album.SongIds.map(async songId => {
        await deleteMusicalEntityLikes(songId);
        await deleteMusicalEntityPosts(songId);
      }))
    }))
    await deleteArtistAlbums(artist._id);
  }
}

export const fetchUserType = async (userId) =>
  (await axios.get(`${usersServerUrl}/${userId}`)).data;

export const logLogout = async (userId, userType) =>
    (axios.post(`${usersServerUrl}/logout`, {userId, userType}))