import React from 'react'
import SignUpForm from './SignUpForm'
import { addUser, addProfile ,addNewFriendsList } from '../serverFunctions';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [cookies, setCookie] = useCookies(['userId']);
  
  const navigate  = useNavigate()
  const onSignUp = async (user, profile) => {
    try {
      const userId = await addUser(user);
      profile.UserId = userId;
      await addProfile(profile);
      await addNewFriendsList(userId);
      setCookie("userId", userId, { path: "/"});
      navigate("/home")
    } catch {}
  }

    return (
      <SignUpForm OnSignUp={onSignUp} />
  )
}

export default CreateUser;