import React from 'react'
import shareIcon from './share-icon.png'
import { useNavigate } from 'react-router-dom'

const ShareButton = ({type, id}) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/newpost?type=${type}&id=${id}`);
    }
    return (
        <span className='clickable' onClick={onClick}>
            <img class='icon' src={shareIcon}/>
        </span>
    )
}

export default ShareButton;