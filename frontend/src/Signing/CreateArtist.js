import React from 'react'
import NewArtistFrom from './NewArtistFrom'
import { addUser } from '../ServerFunctions/UserFunctions';
import { createNewArtist } from '../ServerFunctions/ArtistFunctions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {createEmptyLikesArray} from '../ServerFunctions/likesFunctions';
import { createNewFollowers } from '../ServerFunctions/followersFunctions';
import welcomeBackround from '../Components/backgrounds/background.jpg';

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
        navigate('/addAlbums');
    };

    const onBackButton = async () => {
      try{
        navigate("/login")
      }
      catch{}
    }

  return (
    <div className="createPagesDesign" style={{ backgroundImage: `url(${welcomeBackround})`,
                                                backgroundSize: "cover"}}>
        <div className='createPagesDesignContainer'>
        <NewArtistFrom OnSignUp={OnSignUp} onBackButton={onBackButton}/>
        </div>
    </div>
  )
}

export default CreateArtist