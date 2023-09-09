import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { createSongs } from './SongFunctions';
import { addAlbumToArtist, fetchArtist } from './ArtistFunctions';
import { createEmptyLikesArray } from './likesFunctions'
import { createIdsQuery, isEmptyArray } from '../Utilities';
import { deleteMusicalEntityLikes } from './likesFunctions';
import { deleteMusicalEntityPosts } from './PostsFunctions';
import { deleteAlbumSongs } from './SongFunctions';
import { removeAlbumFromArtist } from './ArtistFunctions';

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
        artistId,
    })).data;

    await createEmptyLikesArray({
        id: albumId,
        type: "album"
    });
    return albumId;
}

export const addAlbumAndSongsToArtist = async (artistId, album, songs) => {
    const albumId = await addNewAlbum(artistId, {
            ...album,
            songsIds: []
    })
    songs.forEach(song => song.albumId = albumId)
    const songsIds = await createSongs(songs);
    album.songsIds = songsIds;
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
    album.artist = await fetchArtist(album.ArtistId)
    return album;
}

export const deleteArtistAlbums = async (artistId) =>
    axios.delete(`${albumsServerUrl}?artistId=${artistId}`)

export const deleteAlbum = async (albumId) => {
    const album = await fetchAlbum(albumId);
    await axios.delete(`${albumsServerUrl}/${albumId}`)
    console.log("f[dsfds")
    await removeAlbumFromArtist(album.artistId, albumId);
    console.log("er-0odgskgo")
    await deleteMusicalEntityLikes(albumId);
    console.log("###")
    await deleteMusicalEntityPosts(albumId);
    console.log("#")
    await deleteAlbumSongs(albumId);
    console.log("wqer-wertk-o")
    await Promise.all(album.songsIds.map(async songId => {
      await deleteMusicalEntityLikes(songId);
      await deleteMusicalEntityPosts(songId);
    }))
}