import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { createEmptyLikesArray } from './likesFunctions'
import { setEntitiesLikes } from '../Common/Utilities';
import { fetchAlbumFullDetails } from './AlbumFunctions';
import { createIdsQuery } from '../Common/Utilities';
import { isEmptyArray } from '../Common/Utilities';
const songServerUrl = `${baseServerUrl}/song`

export const fetchSongs = async (songIds) =>
  !isEmptyArray(songIds) ? (await axios.get(`${songServerUrl}${createIdsQuery(songIds)}`)).data : [];


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

export const fetchSongsFullDetails = async (songs, likes) => {
  songs = setEntitiesLikes(songs, likes);
  const albumsIds = Array.from(new Set(songs.map(song => song.AlbumId)));
  let albums = await Promise.all(albumsIds.map(albumId => fetchAlbumFullDetails(albumId)));
  albums = Object.assign({}, ...albums.map(album => ({[album._id]: album})));
  songs.forEach(song => song.Album = albums[song.AlbumId]);
  return songs;
}
