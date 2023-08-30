import React from 'react';
import thumbsUpIcon from './thumbs-up-icon.png'
import thumbsDownIcon from './thumbs-down-icon.png'

const LikeButton = ({ isLiked, onLike, onDislike}) => {
  return (
    <span className='clickable'>
      {isLiked ? (
        <img className='icon' src={thumbsDownIcon} onClick={onDislike} />
      ) : (
        <img className='icon' src={thumbsUpIcon} onClick={onLike} />
      )}
    </span>
  );
};

export default LikeButton;
