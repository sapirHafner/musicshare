import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider, useCookies } from 'react-cookie';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateUser from './CreateUser';
import axios from "axios";

const baseServerUrl = "http://localhost:4000"
const userServerUrl = `${baseServerUrl}/users`
const profileServerUrl = `${baseServerUrl}/profiles`
const friendsServerUrl = `${baseServerUrl}/friends`

const onSignUp = async (firstName, lastName, email, username, password) => {
    try {
      const userId = await addUser(username, password);
      await addProfile(userId, firstName, lastName, email);
      await addNewFriendsList(userId);
    } catch {}
 }

const addUser = async (username, password) => {
  try {
    const response = await axios.post(userServerUrl, {
      Username: username,
      Password: password
    })
    return response.data;
  } catch (error) {
    if (error.response.status === 400){
      alert("user name already exists")
    }
    throw (error);
  }
}

const addProfile = async (userId, firstName, lastName, email) => {
  await axios.post(profileServerUrl, {
    UserId: userId,
    FirstName: firstName,
    LastName: lastName,
    Email: email
  })
}

const addNewFriendsList = async (userId) => {
  await axios.post(`${friendsServerUrl}/${userId}`);
}

const router = createBrowserRouter([
  {
    path:"/",
    element:
      <React.StrictMode>
        <CookiesProvider>
          <App />
       </CookiesProvider>
      </React.StrictMode>,
  },
  {
    path: "createuser",
    element:  <CreateUser OnSignUp={onSignUp} />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router = {router}/>);

