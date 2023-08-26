import { fetchSong, fetchSongs } from "./SongFunctions";

export const fetchMusicalObjects = async (type, objectIds) => {
    if (type === "song") {
      return await fetchSongs(objectIds)
    }
  }

  export const fetchMusicalObject = async (type, objectId) => {
    if (type == "song") {
      return await fetchSong(objectId);
    }
  }