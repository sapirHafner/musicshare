import React from 'react'
import NewArtistFrom from './NewArtistFrom'
import { addUser, createNewArtist } from './common/serverFunctions';
//import { useDispatch } from 'react-redux'
//import { change } from './redux/userTypeReducer';

import { useNavigate } from 'react-router-dom';
import { useCookies
 } from 'react-cookie';

const CreateArtist = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['userId']);
   // const dispatch = useDispatch();

    const OnSignUp = async (user, artist) => {
        user.Type = "Artist";
        const userId = await addUser(user);
        artist.Albums = [];
        artist.UserId = userId;
        await createNewArtist(artist);
        setCookie("userId", userId, { path: "/"});
        setCookie("userType", "artist", { path: "/"});
        navigate('/addAlbums');
    };
  return (
    <div>
        <NewArtistFrom OnSignUp={OnSignUp}/>
    </div>
  )
}

export default CreateArtist