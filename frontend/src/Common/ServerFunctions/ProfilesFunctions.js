import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { isUsersFriends } from './FriendsFunctions';
import { isFriendRequestSent } from './FriendsRequestsFunctions'

const profilesServerUrl = `${baseServerUrl}/profile`

export const fetchUserProfile = async (userId) =>
    (await axios.get(profilesServerUrl + "/" + userId)).data;

export const addProfile = async (profile) =>
    await axios.post(profilesServerUrl, profile)

export const fetchUserProfileBox = async (userId, currentUserId) =>
{
    const profileBox = (await axios.get(`${profilesServerUrl}/${userId}?box=true`)).data;
    if (!currentUserId) {
        return profileBox
    }
    return {
        ...profileBox,
        isFriend: await isUsersFriends(profileBox.userId, currentUserId),
        isFriendRequestSent: await isFriendRequestSent(currentUserId, profileBox.userId),
        isFriendRequestReceived: await isFriendRequestSent(profileBox.userId, currentUserId)
    }
}

export const fetchUsersProfileBoxes = async (userIds, currentUserId, type) => {
    if (userIds.length === 0) {
        return []
    }
    const profileBoxes = (await axios.get(`${profilesServerUrl}?ids=${userIds.join()}&box=true`)).data
    if (type === "artist") {
        return profileBoxes;
    }
    return Promise.all(profileBoxes.map(async profileBox => {
        return {
            ...profileBox,
            isFriend: await isUsersFriends(profileBox.userId, currentUserId),
            isFriendRequestSent: await isFriendRequestSent(currentUserId, profileBox.userId),
            isFriendRequestReceived: await isFriendRequestSent(profileBox.userId, currentUserId)
        }
    }));
}

export const fetchAllUsersProfileBoxes = async (currentUserId) => {
    const profileBoxes = (await axios.get(`${profilesServerUrl}?box=true`)).data
    return Promise.all(profileBoxes.map(async profileBox => {
        return {
            ...profileBox,
            isFriend: await isUsersFriends(profileBox.userId, currentUserId),
            isFriendRequestSent: await isFriendRequestSent(currentUserId, profileBox.userId),
            isFriendRequestReceived: await isFriendRequestSent(profileBox.userId, currentUserId)
        }
    }));
}

export const deleteProfile = async (userId) =>
    axios.delete(`${profilesServerUrl}/${userId}`)

