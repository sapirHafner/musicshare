import axios from 'axios';
import { baseServerUrl } from './serverFunctions';
import { fetchUserProfileBox } from './ProfilesFunctions';
import { fetchSongs } from './SongFunctions';
import { getTypeIds } from '../Common/Utilities';
import { fetchAlbums } from './AlbumFunctions';
import { fetchArtists } from './ArtistFunctions';
import { fetchFullDetails } from './MusicalObjectsFunctions';
import { createEntitiesIdsDictionary } from '../Common/Utilities';

const postServerUrl = `${baseServerUrl}/post`

export const createNewPost = async (post) =>
    await axios.post(postServerUrl, post);

export const fetchUsersPosts = async (usersIds) =>
  (await axios.get(`${postServerUrl}?userIds=${usersIds.join()}`)).data;

export const fetchUserPosts = async (userId) =>
    await fetchUsersPosts([userId]);

export const fetchPostsFullDetails = async (posts, userId) => {
  let artists = await fetchArtists(getTypeIds(posts, "artist"));
  let albums = await fetchAlbums(getTypeIds(posts, "album"));
  let songs = await fetchSongs(getTypeIds(posts, "song"));
  const [artistsItems, albumsItems, songsItems] = await fetchFullDetails(artists, albums, songs, userId);
  const musicalEntities = createEntitiesIdsDictionary([...artistsItems, ...albumsItems, ...songsItems])
  return await Promise.all(posts.map(async post => {
    return {
      ...post,
      User: await fetchUserProfileBox(post.UserId),
      MusicalEntity: {
        Type: post.MusicalEntity.Type,
        Info: musicalEntities[post.MusicalEntity.Id]
      }
    }
  }))
}
