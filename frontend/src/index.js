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

const onSignUp = async(firstName, lastName, email, Username, Password) => {
  try {
    const response = await axios.post(userServerUrl, {Username: Username, Password:Password})
  } catch (error) {
    if (error.response.status === 400){
      alert("user name already exists")
    }
  }
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

