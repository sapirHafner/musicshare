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

  const handleSignUp= (event) => {
      event.preventDefault()
      const firstName = event.target.firstname.value
      const lastName = event.target.lastname.value
      const email = event.target.email.value
      const userName = event.target.username.value
      const password = event.target.password.value
      onSignUp(firstName, lastName, email, userName, password)
  }

    return (
      <SignUpForm OnSubmit={handleSignUp} />
  )
}

export default CreateUser;