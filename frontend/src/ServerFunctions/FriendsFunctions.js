import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUsersProfileBoxes } from './ProfilesFunctions';

const friendsServerUrl = `${baseServerUrl}/friends`
const friendsRequestsServerUrl = `${baseServerUrl}/friendsRequests`

export const addNewFriendsList = async (userId) =>
    await axios.post(`${friendsServerUrl}/${userId}`);

export const fetchFriends = async (userId) => {
    const friendsIds = (await axios.get(friendsServerUrl + "/" + userId)).data;
    return await fetchUsersProfileBoxes(friendsIds);
};

export const fetchFriendsRequests = async (userId) => {
    const friendsRequestsIds = (await axios.get(friendsRequestsServerUrl + "/" + userId)).data;
    return await fetchUsersProfileBoxes(friendsRequestsIds);
};

export const addFriendRequest = async (myId, userId) =>
    await axios.put(friendsRequestsServerUrl,{askingUserId: myId, receivingUserId: userId});

export const createNewFriendsArray = async (userId) =>
    (await axios.post(friendsRequestsServerUrl, {UserId: userId})).data

export const removeFriendRequestFromDB = async (askingId, userId) =>
    (await axios.delete(friendsRequestsServerUrl, {askingUserId: askingId, receivingUserId: userId}))

export const deleteUserFriends = async (userId) =>
    (await axios.delete(`${friendsServerUrl}/${userId}`))