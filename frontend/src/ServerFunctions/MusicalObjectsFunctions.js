import { fetchSong, fetchSongs } from "./SongFunctions";
import { createEntitiesIdsDictionary, setEntitiesLikes } from "../Common/Utilities";
import { fetchAlbums } from "./AlbumFunctions";
import { fetchUserLikes } from "./likesFunctions";
import { fetchArtists } from "./ArtistFunctions";

export const fetchMusicalObjects = async (musicalObjects) => {
    const songs = musicalObjects.filer(object => object.Type === "song");
    return await fetchSongs(songs.map(song => song.Id))
  }

  export const fetchMusicalObject = async (musicalObject) => {
    if (musicalObject.Type == "song") {
      return await fetchSong(musicalObject.Id);
    }
  }

export const fetchFullDetails = async (artists, albums, songs, userId) => {
  const albumsDict = createEntitiesIdsDictionary([...albums, ...await fetchAlbums(songs.map(song => song.AlbumId))]);
  const artistsDict = createEntitiesIdsDictionary([...artists, ...await fetchArtists(Object.values(albumsDict ).map(album => album.ArtistId)) ]);
  albums.forEach(album => album.artist = artistsDict[album.ArtistId]);
  songs.forEach(song => {
    song.album = albumsDict[song.AlbumId];
    song.artist = artistsDict[song.album.ArtistId];
  });
  const likes = await fetchUserLikes(userId);
  return [setEntitiesLikes(artists, likes), setEntitiesLikes(albums, likes), setEntitiesLikes(songs,likes)];
}