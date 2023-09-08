import React from 'react'
import LikeButton from '../Buttons/LikeButton'
import ShareButton from '../Buttons/ShareButton'
import Link from '../Link'

const AlbumBox = ({album, onLike, onDislike, className}) => {
  return (
    className === "min" ?
      <div className='box'>
        <div className='boximage' >
          <img src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <span className='name'>
          <Link text={album.name} url={`/album/${album._id}`} />
        </span>
      </div>
    :
    <div className='musicalentity box'>
      <div className='details'>
        <div className='boximage'>
          <img src='https://m.media-amazon.com/images/I/31wx3zcYTfL._UF1000,1000_QL80_.jpg' />
        </div>
        <div>
          <Link text={album.name} url={`/album/${album._id}`} />
          <Link text={album.artist.name} url={`/artist/${album.artist._id}`} />
        </div>
      </div>
      <div>
      {
        onLike && onDislike &&
          <LikeButton isLiked={album.liked} onLike={onLike} onDislike={onDislike} likesNumber={album.likesNumber}/>
      }
      <ShareButton type="album" id={album._id} />
      </div>
    </div>
  )
}

export default AlbumBox

