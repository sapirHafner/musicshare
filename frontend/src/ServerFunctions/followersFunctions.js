import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const followersServerUrl = `${baseServerUrl}/followers`

export const fetchArtistFollowers = async (artistId) =>
    (await axios.get(`${followersServerUrl}/${artistId}`)).data.followers;

export const createNewFollowers = async (artistId) =>
    (await axios.post(`${followersServerUrl}`, {artistId})).data;

export const addFollower = async (artistId, userId) =>
    (await axios.put(`${followersServerUrl}`, {add:true, artistId, userId}))

export const removeFollower = async (artistId, userId) =>
    (await axios.put(`${followersServerUrl}`, {add:false, artistId, userId}))

export const deleteArtistFollowers = async (artistId) =>
    (await axios.delete(`${followersServerUrl}/${artistId}`)).data;

export const fetchUsersFollows = async (userIds) =>
    (await axios.get(`${followersServerUrl}?usersIds=${userIds.join()}`)).data;

export const fetchUserFollows = async (userId) =>
    await fetchUsersFollows([userId])

export const isUserFollowing = async(userId, artistId) => {
    const artistFollowers = await fetchArtistFollowers(artistId);
    return artistFollowers.includes(userId);
}