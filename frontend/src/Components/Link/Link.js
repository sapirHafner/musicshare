import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const Link = ({text, url}) => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['userType']);
    const { userType } = cookies;

    const onClick = () => {
        if (userType === "user" || url === '/logout') {
            navigate(url)
        }
    };

    return (
        <div className='link' onClick={onClick}>
            {text}
        </div>
    )
}

export default Link