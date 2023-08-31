import { fetchSong, fetchSongs } from "./SongFunctions";
import { createEntitiesIdsDictionary, setEntitiesLikes } from "../Common/Utilities";
import { fetchAlbum, fetchAlbums } from "./AlbumFunctions";
import { fetchUserLikes } from "./likesFunctions";
import { fetchArtist, fetchArtists } from "./ArtistFunctions";
import { fetchUserFollows } from "./followersFunctions";
import { setEntitiesFollows } from "./ArtistFunctions";\

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
  const artists = await fetchArtists(artistsIds);
  const albums = await fetchAlbums(albumsIds);
  const songs = await fetchSongs(songsIds);
  const albumsDict = createEntitiesIdsDictionary([...albums, ...await fetchAlbums(songs.map(song => song.AlbumId))]);
  const artistsDict = createEntitiesIdsDictionary([...artists, ...await fetchArtists(Object.values(albumsDict).map(album => album.ArtistId)) ]);
  albums.forEach(album => album.artist = artistsDict[album.ArtistId]);
  songs.forEach(song => {
    song.album = albumsDict[song.AlbumId];
    song.artist = artistsDict[song.album.ArtistId];
  });
  const likes = await fetchUserLikes(userId);
  const follows = await fetchUserFollows(userId);
  return [setEntitiesFollows(setEntitiesLikes(artists, likes), follows), setEntitiesLikes(albums, likes), setEntitiesLikes(songs,likes)];
}

