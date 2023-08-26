import { fetchSong, fetchSongs } from "./SongsFunctions";

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