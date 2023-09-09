import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUsersProfileBoxes } from './ProfilesFunctions';

const discoveryServerUrl = `${baseServerUrl}/discovery`

export const fetchDiscoveryProfiles = async (userId, size) => {
    const recommendedFriendsIds = (await axios.get(`${discoveryServerUrl}/friends/${userId}?size=${size}`)).data
    return await fetchUsersProfileBoxes(recommendedFriendsIds, userId)
}

