import React from 'react'
import LikeButton from '../Buttons/LikeButton'
import ShareButton from '../Buttons/ShareButton'

const AlbumHeader = ({ album, onLike, onDislike, onShare }) => {
  return (
    <div className='content header'>
        <div>
            <div className='header-type'>
                album
            </div>
            <div>
                {album.name}
            </div>
            <div className='artist-name'>
              {album.artist}
            </div>
        </div>
        <div className='functions'>
          <LikeButton isLiked={album.liked} onLike={onLike} onDislike={onDislike} likesNumber={album.likesNumber}/>
          {
            onShare &&
              <ShareButton id={album._id} onShare={onShare} />
          }
        </div>
      </div>
  )
}

export default AlbumHeader