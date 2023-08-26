import axios from 'axios';
import { baseServerUrl, createIdsQuery } from './serverFunctions';

const artistServerUrl = `${baseServerUrl}/artist`

export const createNewArtist = async (artist) =>
    (await axios.post(artistServerUrl, artist)).data;

export const fetchArtists = async (artistsIds) =>
    (await axios.get(`${artistServerUrl}${createIdsQuery(artistsIds)}`)).data;
