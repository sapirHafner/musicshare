import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { fetchUserProfileBox } from '../ServerFunctions/ProfilesFunctions';

const Upperbar = () => {
    const [cookies] = useCookies(['userId'])
    const [user, setUser] = useState({});

    const {userId} = cookies;

    useEffect(() => {
        const fetchData = async () => {
            //setUser(await fetchUserProfileBox(userId))
        };
        fetchData();
    },[])

  return (
    <div>
        {userId.FirstName}
    </div>
  )
}

export default Upperbar