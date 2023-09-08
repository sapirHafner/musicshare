import React from 'react'
import LikeButton from '../Buttons/LikeButton'
import ShareButton from '../Buttons/ShareButton'

const AlbumHeader = ({ album, onLike, onDislike }) => {
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
          <ShareButton type="album" id={album._id} />
        </div>
      </div>
  )
}

export default AlbumHeader