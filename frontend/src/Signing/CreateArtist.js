import React from 'react'
import NewArtistFrom from '../User/NewArtistFrom'
import { addUser } from '../ServerFunctions/UserFunctions';
import { createNewArtist } from '../ServerFunctions/ArtistFunctions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {createEmptyLikesArray} from '../ServerFunctions/likesFunctions';
import { createNewFollowers } from '../ServerFunctions/followersFunctions';

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
  return (
    <div>
        <NewArtistFrom OnSignUp={OnSignUp}/>
    </div>
  )
}

export default CreateArtist