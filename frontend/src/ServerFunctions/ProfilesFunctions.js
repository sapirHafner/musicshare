import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const profilesServerUrl = `${baseServerUrl}/profiles`

export const fetchUserProfile = async (userId) =>
    (await axios.get(profilesServerUrl + "/" + userId)).data;

export const addProfile = async (profile) =>
    await axios.post(profilesServerUrl, profile)

export const fetchUserProfileBox = async (userId) =>
  (await axios.get(`${profilesServerUrl}/boxes/${userId}`)).data;

export const fetchUsersProfileBoxes = async (userIds) =>
    (await axios.get(`${profilesServerUrl}/boxes?ids=${userIds.join()}`)).data

