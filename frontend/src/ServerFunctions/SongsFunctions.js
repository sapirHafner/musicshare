import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const songsServerUrl = `${baseServerUrl}/songs`

export const fetchSongs = async (songIds) => {
    const url = songIds !== undefined ? `${songsServerUrl}?ids=${songIds.join()}` : songsServerUrl;
    return (await axios.get(url)).data;
}

export const fetchSong = async (songId) =>
  (await axios.get(`${songsServerUrl}/${songId}`)).data;
