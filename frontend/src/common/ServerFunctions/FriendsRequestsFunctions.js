import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUsersProfileBoxes } from './ProfilesFunctions';

const friendsRequestsServerUrl = `${baseServerUrl}/friendsRequests`

export const fetchFriendsRequests = async (userId) => {
    const friendsRequestsIds = (await axios.get(friendsRequestsServerUrl + "/" + userId)).data;
    return await fetchUsersProfileBoxes(friendsRequestsIds, userId);
};

export const fetchFriendsRequestIds = async (userId) =>
    (await axios.get(friendsRequestsServerUrl + "/" + userId)).data;

export const deleteUserFriendsRequests = async (userId) =>
    axios.delete(`${friendsRequestsServerUrl}/${userId}`);

export const isFriendRequestSent = async (askingUserId, receivingUserId) => {
    const receivingUserFriendsRequests = await fetchFriendsRequestIds(receivingUserId);
    return receivingUserFriendsRequests.includes(askingUserId);
}

export const createNewFriendsRequestsList = async (userId) =>
    (await axios.post(friendsRequestsServerUrl, {userId})).data

export const addFriendRequest = async (askingUserId, receivingUserId) =>
    await axios.put(friendsRequestsServerUrl, {
        add: true,
        askingUserId,
        receivingUserId});

export const removeFriendRequest = async (askingUserId, receivingUserId) =>
    (await axios.put(friendsRequestsServerUrl, {
        add: false,
        askingUserId,
        receivingUserId}))
