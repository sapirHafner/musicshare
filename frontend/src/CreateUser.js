import React from 'react'
import SignUpForm from './SignUpForm'
import { addUser, addProfile ,addNewFriendsList } from './serverFunctions';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [cookies, setCookie] = useCookies(['userId']);
  const navigate  = useNavigate()
  const onSignUp = async (firstName, lastName, email, username, password) => {
    try {
      const userId = await addUser(username, password);
      await addProfile(userId, firstName, lastName, email);
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