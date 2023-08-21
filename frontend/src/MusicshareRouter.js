import React from 'react';
import App from './App';
import { CookiesProvider, useCookies } from 'react-cookie';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateUser from './CreateUser';
import Home from './Home';
import LoginPage from './LoginPage';
import Songs from './Songs';
import Profile from './Profile';
import Friends from './Friends';

const MusicshareRouter = () => {
    const router = createBrowserRouter([
      {
        path:"/",
        element:
          <App />
      },
      {
        path: "createuser",
        element: <CreateUser />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "songs",
        element: <Songs />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "friends",
        element: <Friends />
      }
    ])

    return <RouterProvider router = {router}/>
  }

  export default MusicshareRouter;