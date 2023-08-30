import React from 'react'
import { useNavigate } from 'react-router-dom'

const Link = ({text, url}) => {
    const navigate = useNavigate();
    const onClick = () => navigate(url);

    return (
        <div className='link' onClick={onClick}>
            {text}
        </div>
    )
}

export default Link