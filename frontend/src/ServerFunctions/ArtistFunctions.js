import axios from 'axios';
import { baseServerUrl, createIdsQuery } from './serverFunctions';

const artistServerUrl = `${baseServerUrl}/artist`

export const createNewArtist = async (artist) =>
    (await axios.post(artistServerUrl, artist)).data;

export const fetchArtists = async (artistsIds) =>
    (await axios.get(`${artistServerUrl}${createIdsQuery(artistsIds)}`)).data;

export const fetchArtist = async (artistId) =>
    (await axios.get(`${artistServerUrl}/${artistId}`)).data;

export const fetchArtistByUserId = async (userId) =>
    (await axios.get(`${artistServerUrl}?userIds=${userId}`)).data[0];

export const updateArtist = async (artistId, artist) =>
    await axios.put(artistServerUrl, {
        ...artist,
        _id: artistId,
    })

export const addAlbumToArtist = async (artistId, albumId) => {
    const artist = await fetchArtist(artistId);
    artist.AlbumsIds.push(albumId);
    await updateArtist(artistId, artist)
}