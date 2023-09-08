import React from 'react'
import LikeButton from '../../Buttons/LikeButton';
import ShareButton from '../../Buttons/ShareButton';
import Link from '../../Link';

const AlbumListItem = ({album, onLike, onDislike }) => {
  return (
    <div className='listitem album'>
      <div className='details'>
        <div className='boximage'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div>
          <Link text={album.name} url={`/album/${album._id}`} />
          <Link text={album.artist.name} url={`/artist/${album.artist._id}`} />
        </div>
      </div>
      <div className='functions'>
      {
        onLike && onDislike &&
          <LikeButton id={album._id} isLiked={album.liked} onLike={onLike} onDislike={onDislike} likesNumber={album.likesNumber}/>
      }
      <ShareButton type="album" id={album._id} />
      </div>
    </div>
  )
}

export default AlbumListItem;