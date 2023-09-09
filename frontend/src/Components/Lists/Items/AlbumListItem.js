import React from 'react'
import LikeButton from '../../Buttons/LikeButton';
import ShareButton from '../../Buttons/ShareButton';
import Link from '../../Link';

const AlbumListItem = ({album, onLike, onDislike, onShare }) => {
  return (
    <div className='listitem album'>
      <div className='details'>
      {
          album.imageUrl &&
            <div className='boximage'>
              <img class='musicimage' src={album.imageUrl} />
            </div>
        }
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
      {
        onShare &&
          <ShareButton id={album._id} onShare={onShare} />
      }
      </div>
    </div>
  )
}

export default AlbumListItem;