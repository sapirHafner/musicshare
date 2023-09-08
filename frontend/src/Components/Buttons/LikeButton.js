import React, { useState } from 'react';
import thumbsUpIcon from '../../Assets/Icons/thumbs-up-icon.png'
import thumbsDownIcon from '../../Assets/Icons/thumbs-down-icon.png'

const LikeButton = ({ isLiked, onLike, onDislike, likesNumber}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likesNum, setLikesNum] = useState(likesNumber ? likesNumber : 0);

  const handleLike = () => {
    try {
      setLiked(true);
      setLikesNum(likesNum + 1);
      onLike();
    } catch (error) {
      setLiked(false);
      setLikesNum(likesNum - 1);
    }
  }

  const handleDisike = () => {
    try {
      setLiked(false);
      setLikesNum(likesNum - 1);
      onDislike();
    } catch (error) {
      setLiked(true);
      setLikesNum(likesNum + 1);
    }
  }

  return (
    <span className='clickable'>
    {likesNum}
      {liked ? (
        <img className='icon' src={thumbsDownIcon} onClick={handleDisike} />
      ) : (
        <img className='icon' src={thumbsUpIcon} onClick={handleLike} />
      )}
    </span>
  );
};

export default LikeButton;
