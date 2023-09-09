import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { createIdsQuery, isEmptyArray } from '../Utilities';

const artistServerUrl = `${baseServerUrl}/artist`

export const createNewArtist = async (artist) =>
    (await axios.post(artistServerUrl, artist)).data;

export const fetchArtists = async (artistsIds) =>
    !isEmptyArray(artistsIds) ? (await axios.get(`${artistServerUrl}${createIdsQuery(artistsIds)}`)).data : [];

export const fetchArtist = async (artistId) =>
    (await axios.get(`${artistServerUrl}/${artistId}`)).data;

export const fetchArtistByUserId = async (userId) =>
    (await axios.get(`${artistServerUrl}?userId=${userId}`)).data[0];

export const updateArtist = async (artistId, artist) =>
    await axios.put(artistServerUrl, {
        ...artist,
        _id: artistId,
    })

export const addAlbumToArtist = async (artistId, albumId) => {
    const artist = await fetchArtist(artistId);
    artist.albumsIds.push(albumId);
    await updateArtist(artistId, artist)
}

export const setArtistsFollows = (artists, follows) => {
    const followsIds = follows.map(follows => follows.artistId);
    return artists.map(artist => {return {...artist, followed: followsIds.includes(artist._id)}})
}

export const deleteArtist = async (artistId) =>
    await axios.delete(`${artistServerUrl}/${artistId}`);

export const removeAlbumFromArtist = async (artistId, albumId) => {
    const artist = await fetchArtist(artistId);
    artist.albumsIds = artist.albumsIds.filter(id => id != albumId)
    await updateArtist(artistId, artist);
}