import React from 'react';
import { useLocation } from 'react-router-dom'
import SongBox from '../Components/Boxes/SongBox';
import AlbumBox from '../Components/Boxes/AlbumBox'
import ArtistBox from '../Components/Boxes/ArtistBox'

export const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const setEntitiesLikes = (entities, likes) => {
  const likesIds = likes.map(like => like.musicalEntity.id);
  return entities.map(entity => {return {...entity, liked: likesIds.includes(entity._id)}})
}

export const createEntitiesIdsDictionary = (entities) => {
    return Object.assign({}, ...entities.map(entity => ({[entity._id]: entity})));
}

export const getTypeIds = (array, type) =>
    array.filter(element => element.musicalEntity.type === type).map(element => element.musicalEntity.id)

export const createIdsQuery = (ids) => {
  if (ids === undefined) {
    return ''
  }
  return `?ids=${ids.join()}`

}

export const isEmptyArray = (array) =>
  Array.isArray(array) && array.length === 0;

export const getMusicalEntityBoxComponent = (musicalEntity) => {
  if (musicalEntity.type === "song") {
    return <SongBox song={musicalEntity.entity} />
  } else if (musicalEntity.type === "album") {
    return <AlbumBox album={musicalEntity.entity} />
  } else if (musicalEntity.type === "artist") {
    return <ArtistBox artist={musicalEntity.entity} />
  }
}

export const getTypePosts = (array, type) =>
  array.filter(element => element.type === type).map(element => element.post)
