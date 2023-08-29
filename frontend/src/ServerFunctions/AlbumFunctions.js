import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { createSongs } from './SongFunctions';
import { addAlbumToArtist, fetchArtist } from './ArtistFunctions';
import { createEmptyLikesArray } from './likesFunctions'
import { createIdsQuery, isEmptyArray } from '../Common/Utilities';

const albumsServerUrl = `${baseServerUrl}/album`

export const fetchAlbum = async (albumId) =>
    (await axios.get(`${albumsServerUrl}/${albumId}`)).data;

export const fetchAlbums = async (albumsIds) =>
    !isEmptyArray(albumsIds) ? (await axios.get(`${albumsServerUrl}${createIdsQuery(albumsIds)}`)).data : [];

export const getArtistAlbums = async (artistId) =>
    (await axios.get(`${albumsServerUrl}?artistId=${artistId}`)).data;

export const addNewAlbum = async (artistId, album) => {
    const albumId = (await axios.post(albumsServerUrl, {
        ...album,
        ArtistId: artistId,
    })).data;

    await createEmptyLikesArray({
        Id: albumId,
        Type: "album"
    });
    return albumId;
}

export const addAlbumAndSongsToArtist = async (artistId, album, songs) => {
    const albumId = await addNewAlbum(artistId,
        {
            ...album,
            SongIds: []
        })
    songs.forEach(song => song.AlbumId = albumId)
    const songIds = await createSongs(songs);
    album.SongIds = songIds;
    await updateAlbum(albumId, album)
    await addAlbumToArtist(artistId, albumId)
    return albumId;
}

export const updateAlbum = async (albumId, album) =>
    (await axios.put(albumsServerUrl, {
        ...album,
        _id: albumId
    })).data

export const fetchAlbumFullDetails = async (albumId) => {
    const album = await fetchAlbum(albumId);
    album.Artist = await fetchArtist(album.ArtistId)
    return album;
}