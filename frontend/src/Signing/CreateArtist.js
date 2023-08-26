import React from 'react'
import NewArtistFrom from '../User/NewArtistFrom'
import { addUser } from '../ServerFunctions/UserFunctions';
import { createNewArtist } from '../ServerFunctions/ArtistFunctions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CreateArtist = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['userId']);

    const OnSignUp = async (user, artist) => {
        user.Type = "artist";
        const userId = await addUser(user);
        artist.Albums = [];
        artist.UserId = userId;
        const artistId = await createNewArtist(artist);
        setCookie("userId", userId, { path: "/"});
        setCookie("userType", "artist", { path: "/"});
        setCookie('artistId', artistId, {path: '/'});
        navigate('/addAlbums');
    };
  return (
    <div>
        <NewArtistFrom OnSignUp={OnSignUp}/>
    </div>
  )
}

export default CreateArtist