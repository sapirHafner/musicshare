import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUsersProfileBoxes } from './ProfilesFunctions';

const friendsServerUrl = `${baseServerUrl}/friends`

export const addNewFriendsList = async (userId) =>
    await axios.post(`${friendsServerUrl}/${userId}`);

export const fetchFriends = async (userId) => {
    const friendsIds = await fetchFriendsIds(userId);
    return await fetchUsersProfileBoxes(friendsIds, userId);
};

export const fetchFriendsIds = async (userId) =>
    (await axios.get(`${friendsServerUrl}/${userId}`)).data;

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

export const deleteUserFriends = async (userId) =>
    (await axios.delete(`${friendsServerUrl}/${userId}`))