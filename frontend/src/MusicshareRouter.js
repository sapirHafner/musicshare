import React from 'react';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateUser from './CreateUser';
import Home from './Home';
import LoginPage from './LoginPage';
import Profile from './Profile';
import Friends from './Friends';
import Library from './Library';
import NewPost from './NewPost';
import Browse from './Browse';

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
        path: "browse",
        element: <Browse />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "friends",
        element: <Friends />
      },
      {
        path: `library`,
        element: <Library />
      },
      {
        path: `newpost`,
        element: <NewPost />
      }
    ])

    return <RouterProvider router = {router}/>
  }

  export default MusicshareRouter;