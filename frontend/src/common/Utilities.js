import React from 'react';
import { useLocation } from 'react-router-dom'

export const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const setEntitiesLikes = (entities, likes) => {
    const likesIds = likes.map(like => like.MusicalEntity.Id);
    return entities.map(entity => {return {...entity, liked: likesIds.includes(entity._id)}})
}

export const createEntitiesIdsDictionary = (entities) => {
    return Object.assign({}, ...entities.map(entity => ({[entity._id]: entity})));
}

export const getTypeIds = (array, type) =>
    array.filter(element => element.MusicalEntity.Type === type).map(element => element.MusicalEntity.Id)

export const createIdsQuery = ids => {
  if (ids === undefined) {
    return ''
  }
  return `?ids=${ids.join()}`

}

export const isEmptyArray = (array) =>
  Array.isArray(array) && array.length === 0;



