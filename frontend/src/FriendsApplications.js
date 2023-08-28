import React from 'react'
import { useCookies } from 'react-cookie';

const FriendApplication = () => {
    const [cookies] = useCookies(['userId']);
    const { userId } = cookies;
    
}