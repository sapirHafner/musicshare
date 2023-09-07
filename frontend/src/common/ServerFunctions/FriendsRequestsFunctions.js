import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchFriendsRequests } from './FriendsFunctions';

const friendsRequestsServerUrl = `${baseServerUrl}/friendsRequests`

export const fetchFriendsRequestIds = async (userId) =>
    (await axios.get(friendsRequestsServerUrl + "/" + userId)).data;

export const deleteUserFriendsRequests = async (userId) =>
    axios.delete(`${friendsRequestsServerUrl}/${userId}`);

export const isFriendRequestSent = async (askingUserId, receivingUserId) => {
    const receivingUserFriendsRequests = await fetchFriendsRequestIds(receivingUserId);
    return receivingUserFriendsRequests.includes(askingUserId);
}