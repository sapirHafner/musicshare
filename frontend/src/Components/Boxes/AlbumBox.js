import React from 'react'
import LikeButton from '../Buttons/LikeButton'
import ShareButton from '../Buttons/ShareButton'
import deleteIcon from '../../Assets/Icons/delete-icon.png'
import Link from '../Link'

const AlbumBox = ({album, onLike, onDislike, onShare, className, onDelete}) => {
  return (
    className === "min" ?
      <div className='box'>
      { onDelete && <img className='icon' src={deleteIcon} onClick={() => onDelete(album._id)}/>}
      {
        album.imageUrl &&
        <div className='boximage'>
          <img class='musicimage' src={album.imageUrl}/>
        </div>
      }
        <span className='name'>
          <Link text={album.name} url={`/album/${album._id}`} />
        </span>
      </div>
    :
    <div className='musicalentity box'>
      <div className='details'>
      {
        album.imageUrl &&
        <div className='boximage'>
          <img class='musicimage' src={album.imageUrl}/>
        </div>
      }
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
      {
        onShare &&
          <ShareButton id={album._id} onShare={onShare} />
      }
      </div>
    </div>
  )
}

export default AlbumBox

