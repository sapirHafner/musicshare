import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
const friendsRequestsServerUrl = `${baseServerUrl}/friendsRequests`

export const deleteUserFriendsRequests = async(userId) =>
    axios.delete(`${friendsRequestsServerUrl}/${userId}`);