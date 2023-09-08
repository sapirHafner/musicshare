import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

import Link from '../../Link';

import LikeButton from '../../Buttons/LikeButton'
import ShareButton from '../../Buttons/ShareButton'
import FollowersButton from '../../Buttons/FollowersButton'

import { addFollower, removeFollower } from '../../../Common/ServerFunctions/followersFunctions';
import { addArtistLike, removeArtistLike } from '../../../Common/ServerFunctions/likesFunctions';


const ArtistListItem = ({artist}) => {
  const [cookies] = useCookies(['userId']);
  const [isFollowed, setIsFollowed] = useState(artist.followed);
  const { userId } = cookies;

  const onFollow = () => {
    const handleFollow = async () => {
      try {
        setIsFollowed(true);
        await addFollower(artist._id, userId)
      } catch (error) {
        setIsFollowed(false);
      }
    };
    handleFollow();
  }

  const onUnfollow = () => {
    const handleFollow = async () => {
      try {
        setIsFollowed(false);
        await removeFollower(artist._id, userId)
      } catch (error) {
        setIsFollowed(true);
      }
    };
    handleFollow();
  }

  return (
    <div className='listitem artist'>
      <div className='details'>
        <div className='boximage'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <span className='artistName'>
          <Link text={artist.name} url={`/artist/${artist._id}`} />
        </span>
      </div>
      <div className='functions'>
        <LikeButton isLiked={artist.liked} onLike={() => addArtistLike(userId, artist._id)} onDislike={() => removeArtistLike(userId, artist._id)} likesNumber={artist.likesNumber}/>
        <FollowersButton isFollowed={isFollowed} onFollow={onFollow} onUnfollow={onUnfollow}/>
        <ShareButton type="artist" id={artist._id} />
      </div>
    </div>
  )
}

export default ArtistListItem;