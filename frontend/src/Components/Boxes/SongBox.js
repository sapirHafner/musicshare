import React from 'react'
import LikeButton from '../Buttons/LikeButton';
import ShareButton from '../Buttons/ShareButton'
import Link from '../Link';

const SongBox = ({song, onLike, onDislike}) => {

  return (
    <div className='musicalentity box'>
      <div className='details'>
        <div className='boximage'>
          <img class='musicimage' src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div>
          <Link text={song.name} url={`/song/${song._id}`} />
          <Link text={song.artist.name} url={`/artist/${song.artist._id}`} />
          <span className='albumName'>
            <Link text={song.album.name} url={`/album/${song.album._id}`} />
          </span>
        </div>
      </div>
      <div className="functions">
      {
        onLike && onDislike &&
          <LikeButton isLiked={song.liked} onLike={onLike} onDislike={onDislike} likesNumber={song.likesNumber}/>
      }
      <ShareButton type="song" id={song._id} />
      </div>
    </div>
  )
}

export default SongBox