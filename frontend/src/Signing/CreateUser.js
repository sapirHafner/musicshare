import React from 'react'
import SignUpForm from './SignUpForm'
import { addUser } from '../ServerFunctions/UserFunctions';
import { addProfile } from '../ServerFunctions/ProfilesFunctions';
import { addNewFriendsList } from '../ServerFunctions/FriendsFunctions';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { createNewFriendsArray } from '../ServerFunctions/FriendsFunctions';
import welcomeBackround from '../Components/backgrounds/background.jpg';

const CreateUser = () => {
  const [cookies, setCookie] = useCookies(['userId']);
  const navigate  = useNavigate()

  const onSignUp = async (user, profile, setErrorMessage) => {
    try {
      user.Type = "user";
      const userId = await addUser(user);
      profile.UserId = userId;
      await addProfile(profile);
      await addNewFriendsList(userId);
      await createNewFriendsArray(userId);
      setCookie("userId", userId, { path: "/"});
      setCookie("userType", "user", { path: "/"});
      navigate("/home")
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Username is already taken")
      }
    }
  }

    return (
      <div className="loginPageDesign" style={{ backgroundImage: `url(${welcomeBackround})`,
                                                backgroundSize: "cover"}}>

        <div className='loginPageContainer createPagesDesignContainer'>

        <SignUpForm OnSignUp={onSignUp} />
        </div>
      </div>
  )
}

export default CreateUser;