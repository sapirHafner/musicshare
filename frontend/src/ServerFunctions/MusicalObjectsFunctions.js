import { fetchSong, fetchSongs } from "./SongFunctions";

export const fetchMusicalObjects = async (musicalObjects) => {
    const songs = musicalObjects.filer(object => object.Type === "song");
    return await fetchSongs(songs.map(song => song.Id))
  }

  export const fetchMusicalObject = async (musicalObject) => {
    if (musicalObject.Type == "song") {
      return await fetchSong(musicalObject.Id);
    }
  }