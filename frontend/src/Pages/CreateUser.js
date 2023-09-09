import React, { useState, useEffect } from 'react'
import SignUpForm from '../Components/Forms/SignUpForm'
import { addUser, deleteUser } from '../Common/ServerFunctions/UserFunctions';
import { addProfile } from '../Common/ServerFunctions/ProfilesFunctions';
import { addNewFriendsList } from '../Common/ServerFunctions/FriendsFunctions';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { createNewFriendsRequestsList } from '../Common/ServerFunctions/FriendsRequestsFunctions';
import welcomeBackround from '../Assets/backgrounds/background.jpg';
import { getFeatureFlag } from '../Common/ServerFunctions/featureFlagsFunctions';

const CreateUser = () => {
  const [cookies, setCookie] = useCookies(['userId']);
  const [imagesFeatureFlag, setImagesFeatureFlag] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate  = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setImagesFeatureFlag(await getFeatureFlag("images"))
      setIsLoaded(true)
    }
    fetchData();
  }, [])

  const onSignUp = async (user, profile, setErrorMessage) => {
    try {
      user.type = "user";
      let userId;
      try {
        userId = await addUser(user);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMessage("Username is already taken")
          return;
        }
      }
      profile.userId = userId;
      try {
        await addProfile(profile);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMessage("Email is already taken")
          await deleteUser(userId);
        }
        return;
      }
      await addNewFriendsList(userId);
      await createNewFriendsRequestsList(userId);
      setCookie("userId", userId, { path: "/"});
      setCookie("userType", "user", { path: "/"});
      navigate("/home")
    } catch (error) {

    }
  }

    return (
      <div className="loginPageDesign" style={{ backgroundImage: `url(${welcomeBackround})`,
                                                backgroundSize: "cover"}}>

        <div className='loginPageContainer createPagesDesignContainer'>
        {
          isLoaded &&
            <SignUpForm onSignUp={onSignUp}
                        uploadImage={imagesFeatureFlag}/>
        }
        </div>
      </div>
  )
}

export default CreateUser;