import { fetchSong, fetchSongs } from "./SongFunctions";
import { createEntitiesIdsDictionary, setEntitiesLikes } from "../Utilities";
import { fetchAlbum, fetchAlbums } from "./AlbumFunctions";
import { fetchUserLikes, getEntityLikesNumber } from "./likesFunctions";
import { fetchArtist, fetchArtists } from "./ArtistFunctions";
import { fetchUserFollows } from "./followersFunctions";
import { setArtistsFollows } from "./ArtistFunctions";

export const fetchMusicalEntity = async (musicalEntity) => {
  if (musicalEntity.type === "artist") {
    musicalEntity.entity = await fetchArtist(musicalEntity.id);
    return musicalEntity;
  } else if (musicalEntity.type === "album") {
      const album = await fetchAlbum(musicalEntity.id);
      const artist = await fetchArtist(album.artistId);
      musicalEntity.entity = {
        ...album,
        artist
      }
      return musicalEntity;
    } else if (musicalEntity.type === "song") {
    const song = await fetchSong(musicalEntity.id);
    const album = await fetchAlbum(song.albumId);
    const artist = await fetchArtist(album.artistId);
    musicalEntity.entity =  {
      ...song,
      album,
      artist
    }
    return musicalEntity;
  }
}

export const fetchFullDetails = async (userId, artistsIds, albumsIds, songsIds) => {
  let artists = await fetchArtists(artistsIds);
  let albums = await fetchAlbums(albumsIds);
  let songs = await fetchSongs(songsIds);
  const albumsDict = createEntitiesIdsDictionary([...albums, ...await fetchAlbums(songs.map(song => song.albumId))]);
  const artistsDict = createEntitiesIdsDictionary([...artists, ...await fetchArtists(Object.values(albumsDict).map(album => album.artistId)) ]);
  albums = await Promise.all(albums.map(async (album) => {
    return {
      ...album,
      artist: artistsDict[album.artistId],
      likesNumber: await getEntityLikesNumber(album._id),
    }
  }));

  songs = await Promise.all(songs.map(async (song) => {
    const album = albumsDict[song.albumId];
    const artist = artistsDict[album.artistId]
    return {
      ...song,
      album,
      artist,
      likesNumber: await getEntityLikesNumber(song._id),
    }
  }));

  artists = await Promise.all(artists.map(async (artist) => {
    return {
      ...artist,
      likesNumber: await getEntityLikesNumber(artist._id)
    }
  }))

  if (userId) {
    const likes = await fetchUserLikes(userId);
    const follows = await fetchUserFollows(userId);
    return [setArtistsFollows(setEntitiesLikes(artists, likes), follows), setEntitiesLikes(albums, likes), setEntitiesLikes(songs,likes)];
  }
  return [artists, albums, songs]
}