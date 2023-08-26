import React, { useEffect, useState } from 'react'
import ArtistNavBar from './ArtistNavBar'
import { useCookies } from 'react-cookie'
import Button from '../Common/Button'
import { useNavigate } from 'react-router-dom'


const MyMusic = () => {
    const [cookies] = useCookies(['userId'])
    const {userId} = cookies;

    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const albums = 1;
        }
    },[])

    return (
        <div>
            <ArtistNavBar selectedItem={"My Music"}/>
            <Button text="Add new album" onClick={()=>{navigate("/addNewAlbum")}} />
        </div>
    )
}

export default MyMusic