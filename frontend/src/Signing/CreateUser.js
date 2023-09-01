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
  
  const onSignUp = async (user, profile) => {
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
    } catch {}
  }

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

        <SignUpForm OnSignUp={onSignUp} onBackButton={onBackButton} />
        </div>
      </div>
  )
}

export default CreateUser;