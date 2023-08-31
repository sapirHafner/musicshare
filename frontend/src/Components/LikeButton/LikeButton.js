import React, { useState } from 'react';
import thumbsUpIcon from './thumbs-up-icon.png'
import thumbsDownIcon from './thumbs-down-icon.png'

const LikeButton = ({ isLiked, onLike, onDislike, likesNumber}) => {
  const [likesNum, setLikesNum] = useState(likesNumber ? likesNumber : 0);
  const handleLike = () => {
    try {
      setLikesNum(likesNum + 1);
      onLike();
    } catch (error) {
      setLikesNum(likesNum - 1);
    }
  }

  const handleDisike = () => {
    try {
      setLikesNum(likesNum - 1);
      onDislike();
    } catch (error) {
      setLikesNum(likesNum + 1);
    }
  }

  return (
    <span className='clickable'>
    {likesNum}
      {isLiked ? (
        <img className='icon' src={thumbsDownIcon} onClick={handleDisike} />
      ) : (
        <img className='icon' src={thumbsUpIcon} onClick={handleLike} />
      )}
    </span>
  );
};

export default LikeButton;
