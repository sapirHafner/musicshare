import React from 'react';
import { useLocation } from 'react-router-dom'

export const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const setEntitiesLikes = (entities, likes) =>
{
    const likesIds = likes.map(like => like.MusicalEntity.Id);
    return entities.map(entity => {return {...entity, likesIds: likes.includes(entity._id)}})
}
