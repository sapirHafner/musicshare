import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUsersProfileBoxes } from './ProfilesFunctions';

const friendsServerUrl = `${baseServerUrl}/friends`


export const addNewFriendsList = async (userId) =>
    await axios.post(`${friendsServerUrl}/${userId}`);

export const fetchFriends = async (userId) => {
    const friendsIds = (await axios.get(friendsServerUrl + "/" + userId)).data;
    return await fetchUsersProfileBoxes(friendsIds);
};