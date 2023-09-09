import React, { useState, useEffect } from 'react'
import NewArtistFrom from '../Components/Forms/NewArtistFrom'
import { addUser } from '../Common/ServerFunctions/UserFunctions';
import { createNewArtist } from '../Common/ServerFunctions/ArtistFunctions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {createEmptyLikesArray} from '../Common/ServerFunctions/likesFunctions';
import { createNewFollowers } from '../Common/ServerFunctions/followersFunctions';
import welcomeBackround from '../Assets/backgrounds/background.jpg';
import { getFeatureFlag } from '../Common/ServerFunctions/featureFlagsFunctions';

const CreateArtist = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['userId']);
    const [imagesFeatureFlag, setImagesFeatureFlag] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setImagesFeatureFlag(await getFeatureFlag("images"))
        setIsLoaded(true)
      }
      fetchData();
    }, [])

    const onSignUp = async (user, artist) => {
        user.type = "artist";
        const userId = await addUser(user);
        artist.albums = [];
        artist.userId = userId;
        const artistId = await createNewArtist(artist);
        await createEmptyLikesArray({
          id: artistId,
          type: "artist"
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
        {
          isLoaded &&
            <NewArtistFrom onSignUp={onSignUp}
                            uploadImage={imagesFeatureFlag}/>
        }
        </div>
    </div>
  )
}

export default CreateArtist