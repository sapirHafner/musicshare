import React from 'react'
import NewArtistFrom from '../Components/Forms/NewArtistFrom'
import { addUser } from '../Common/ServerFunctions/UserFunctions';
import { createNewArtist } from '../Common/ServerFunctions/ArtistFunctions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {createEmptyLikesArray} from '../Common/ServerFunctions/likesFunctions';
import { createNewFollowers } from '../Common/ServerFunctions/followersFunctions';
import welcomeBackround from '../Assets/backgrounds/background.jpg';

const CreateArtist = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['userId']);

    const OnSignUp = async (user, artist) => {
        user.Type = "artist";
        const userId = await addUser(user);
        artist.Albums = [];
        artist.UserId = userId;
        const artistId = await createNewArtist(artist);
        await createEmptyLikesArray({
          Id: artistId,
          Type: "artist"
        });
        await createNewFollowers(artistId);
        setCookie("userId", userId, { path: "/"});
        setCookie("userType", "artist", { path: "/"});
        setCookie('artistId', artistId, {path: '/'});
        navigate('/');
    };


  return (
    <div className="loginPageDesign" style={{ backgroundImage: `url(${welcomeBackround})`,
                                                backgroundSize: "cover"}}>
        <div className='loginPageContainer createPagesDesignContainer'>
        <NewArtistFrom OnSignUp={OnSignUp}/>
        </div>
    </div>
  )
}

export default CreateArtist