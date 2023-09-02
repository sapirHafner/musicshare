import { fetchSong, fetchSongs } from "./SongFunctions";
import { createEntitiesIdsDictionary, setEntitiesLikes } from "../Common/Utilities";
import { fetchAlbum, fetchAlbums } from "./AlbumFunctions";
import { fetchUserLikes, getEntityLikesNumber } from "./likesFunctions";
import { fetchArtist, fetchArtists } from "./ArtistFunctions";
import { fetchUserFollows } from "./followersFunctions";
import { setArtistsFollows } from "./ArtistFunctions";

export const fetchMusicalEntity = async (musicalEntity) => {
  if (musicalEntity.Type === "artist") {
    musicalEntity.entity = await fetchArtist(musicalEntity.Id);
    return musicalEntity;
  } else if (musicalEntity.Type === "album") {
      const album = await fetchAlbum(musicalEntity.Id);
      const artist = await fetchArtist(album.ArtistId);
      musicalEntity.entity = {
        ...album,
        artist
      }
      return musicalEntity;
    } else if (musicalEntity.Type === "song") {
    const song = await fetchSong(musicalEntity.Id);
    const album = await fetchAlbum(song.AlbumId);
    const artist = await fetchArtist(album.ArtistId);
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

  const albumsDict = createEntitiesIdsDictionary([...albums, ...await fetchAlbums(songs.map(song => song.AlbumId))]);
  const artistsDict = createEntitiesIdsDictionary([...artists, ...await fetchArtists(Object.values(albumsDict).map(album => album.ArtistId)) ]);

  albums = await Promise.all(albums.map(async (album) => {
    return {
      ...album,
      artist: artistsDict[album.ArtistId],
      likesNumber: await getEntityLikesNumber(album._id),
    }
  }));

  songs = await Promise.all(songs.map(async (song) => {
    const album = albumsDict[song.AlbumId];
    const artist = artistsDict[album.ArtistId]
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

