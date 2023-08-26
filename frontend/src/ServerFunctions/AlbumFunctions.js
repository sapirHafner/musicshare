import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const albumsServerUrl = `${baseServerUrl}/albums`

export const getArtistAlbums = async (artistId) =>
    (await axios.get(`${albumsServerUrl}?artistId=${artistId}`)).data;
