import React from 'react'
import LikeButton from '../../Buttons/LikeButton';
import ShareButton from '../../Buttons/ShareButton';
import Link from '../../Link'

const SongListItem = ({song, onLike, onDislike, onShare}) => {
  return (
    <div className='listitem'>
      <div className='details'>
      {
          song.album.imageUrl &&
            <div className='boximage'>
              <img class='musicimage' src={song.album.imageUrl} />
            </div>
        }
          <div>
            <Link text={song.name} url={`/song/${song._id}`} />
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