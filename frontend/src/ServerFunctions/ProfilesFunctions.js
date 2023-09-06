import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { isUsersFriends } from './FriendsFunctions';
import { isFriendRequestSent } from './FriendsRequestsFunctions'

const profilesServerUrl = `${baseServerUrl}/profiles`

export const fetchUserProfile = async (userId) =>
    (await axios.get(profilesServerUrl + "/" + userId)).data;

export const addProfile = async (profile) =>
    await axios.post(profilesServerUrl, profile)

export const fetchUserProfileBox = async (userId) =>
  (await axios.get(`${profilesServerUrl}/boxes/${userId}`)).data;

export const fetchUsersProfileBoxes = async (userIds, currentUserId) => {
    if (userIds.length === 0) {
        return []
    }
    const profileBoxes = (await axios.get(`${profilesServerUrl}/boxes?ids=${userIds.join()}`)).data
    return Promise.all(profileBoxes.map(async profileBox => {
        return {
            ...profileBox,
            isFriend: await isUsersFriends(profileBox.UserId, currentUserId),
            isFriendRequestSent: await isFriendRequestSent(currentUserId, profileBox.UserId),

        }
    }));
}


export const deleteProfile = async (userId) =>
    axios.delete(`${profilesServerUrl}/${userId}`)

