import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { createSongs } from './SongFunctions';
import { addAlbumToArtist } from './ArtistFunctions';
import { createEmptyLikesArray } from './likesFunctions'

const albumsServerUrl = `${baseServerUrl}/album`

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