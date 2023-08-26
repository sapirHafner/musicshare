import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { createEmptyLikesArray } from './likesFunctions'

const songServerUrl = `${baseServerUrl}/song`

export const fetchSongs = async (songIds) => {
    const url = songIds !== undefined ? `${songServerUrl}?ids=${songIds.join()}` : songServerUrl;
    return (await axios.get(url)).data;
}

export const fetchSong = async (songId) =>
  (await axios.get(`${songServerUrl}/${songId}`)).data;

export const createSongs = async (songs) => {
  const songIds = (await axios.post(songServerUrl, {Songs: songs})).data
  await Promise.all(songIds.map(songId => createEmptyLikesArray({
      Id: songId,
      Type: "song"
  })))
  return songIds;
}

