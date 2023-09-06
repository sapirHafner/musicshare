import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUsersProfileBoxes } from './ProfilesFunctions';

const friendsServerUrl = `${baseServerUrl}/friends`
const friendsRequestsServerUrl = `${baseServerUrl}/friendsRequests`

export const addNewFriendsList = async (userId) =>
    await axios.post(`${friendsServerUrl}/${userId}`);

export const fetchFriends = async (userId) => {
    const friendsIds = await fetchFriendsIds(userId);
    return await fetchUsersProfileBoxes(friendsIds, userId);
};

export const fetchFriendsIds = async (userId) =>
    (await axios.get(friendsServerUrl + "/" + userId)).data;

export const addFriendshipBetweenUsers = async (firstUserId, secondUserId) =>
    (axios.put(friendsServerUrl, {
        add: true,
        FirstUserId: firstUserId,
        SecondUserId: secondUserId
    }));

export const removeFriendshipBetweenUsers = async (firstUserId, secondUserId) =>
    (axios.put(friendsServerUrl, {
        add: false,
        FirstUserId: firstUserId,
        SecondUserId: secondUserId
    }));

export const isUsersFriends = async (firstUserId, secondUserId) => {
    const firstUserFriends = await fetchFriendsIds(firstUserId);
    return firstUserFriends.includes(secondUserId);
}













export const fetchFriendsRequests = async (userId) => {
    const friendsRequestsIds = (await axios.get(friendsRequestsServerUrl + "/" + userId)).data;
    return await fetchUsersProfileBoxes(friendsRequestsIds, userId);
};


export const deleteUserFriends = async (userId) =>
    (await axios.delete(`${friendsServerUrl}/${userId}`))









export const createNewFriendsArray = async (userId) =>
    (await axios.post(friendsRequestsServerUrl, {UserId: userId})).data

export const addFriendRequest = async (askingUserId, receivingUserId) =>
    await axios.put(friendsRequestsServerUrl, {
        add: true,
        askingUserId,
        receivingUserId});

export const removeFriendRequestFromDB = async (askingUserId, receivingUserId) =>
    (await axios.put(friendsRequestsServerUrl, {
        add: false,
        askingUserId,
        receivingUserId}))
