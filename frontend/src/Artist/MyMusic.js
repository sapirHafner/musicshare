import React, { useEffect, useState } from 'react'
import ArtistNavBar from './ArtistNavBar'
import { useCookies } from 'react-cookie'


const MyMusic = () => {
    const [cookies] = useCookies(['userId'])
    const [isLoaded, setIsLoaded] = useState(false);
    const {userId} = cookies;

    useEffect(() => {
        const fetchData = async () => {

        }
    },[])

    return (
        <div>
            <ArtistNavBar selectedItem={"My Music"}/>
        </div>
    )
}

export default MyMusic