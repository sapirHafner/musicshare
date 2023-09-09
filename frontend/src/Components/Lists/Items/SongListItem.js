import React from 'react'
import LikeButton from '../../Buttons/LikeButton';
import ShareButton from '../../Buttons/ShareButton';
import Link from '../../Link'

const SongListItem = ({song, onLike, onDislike, onShare}) => {
  return (
    <div className='listitem'>
      <div className='details'>
          <div className='boximage'>
            <img src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
          </div>
          <div>
            {song.name}
            <Link text={song.artist.name} url={`/artist/${song.artist._id}`} />
          </div>
      </div>
      <span className='albumName'>
        <Link text={song.album.name} url={`/album/${song.album._id}`} />
      </span>
      <div className='functions'>
        {
          onLike && onDislike &&
          <LikeButton id={song._id} isLiked={song.liked} onLike={onLike} onDislike={onDislike} likesNumber ={song.likesNumber} />
        }
        {
          onShare &&
          <ShareButton id={song._id} onShare={onShare} />
        }
      </div>
    </div>
  )
}

export default SongListItem