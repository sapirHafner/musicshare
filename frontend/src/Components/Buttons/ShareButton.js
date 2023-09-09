import React from 'react'
import shareIcon from '../../Assets/Icons/share-icon.png'

const ShareButton = ({id, onShare}) => {
    const handleShare = (event) => onShare(event.target.id);
    return (
        <span className='clickable' onClick={handleShare}>
            <img id={id} class='icon' src={shareIcon}/>
        </span>
    )
}

export default ShareButton;