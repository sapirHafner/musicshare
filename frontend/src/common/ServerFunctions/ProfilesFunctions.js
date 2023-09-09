import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { isUsersFriends } from './FriendsFunctions';
import { isFriendRequestSent } from './FriendsRequestsFunctions'

const profilesServerUrl = `${baseServerUrl}/profile`

export const fetchUserProfile = async (userId) =>
    (await axios.get(profilesServerUrl + "/" + userId)).data;

export const addProfile = async (profile) =>
    await axios.post(profilesServerUrl, profile)

export const fetchUserProfileBox = async (userId) =>
  (await axios.get(`${profilesServerUrl}/${userId}?box=true`)).data;

export const fetchUsersProfileBoxes = async (userIds, currentUserId) => {
    if (userIds.length === 0) {
        return []
    }
    const profileBoxes = (await axios.get(`${profilesServerUrl}?ids=${userIds.join()}&box=true`)).data
    return Promise.all(profileBoxes.map(async profileBox => {
        return {
            ...profileBox,
            isFriend: await isUsersFriends(profileBox.userId, currentUserId),
            isFriendRequestSent: await isFriendRequestSent(currentUserId, profileBox.userId),
        }
    }));
}


export const deleteProfile = async (userId) =>
    axios.delete(`${profilesServerUrl}/${userId}`)

