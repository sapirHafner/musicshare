import React from 'react';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateUser from './CreateUser';
import Home from './Home';
import LoginPage from './LoginPage';
import Profile from './User/Profile';
import Friends from './Friends';
import Library from './User/Library';
import NewPost from './NewPost';
import Browse from './User/Browse';
import CreateArtist from './Signing/CreateArtist';
import AddAlbums from './Artist/AddAlbums';

const router = createBrowserRouter([
      {
        path:"/",
        element:
          <App />
      },
      {
        path: "createUser",
        element: <CreateUser />
      },
      {
        path: "createArtist",
        element: <CreateArtist />
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
      },
      {
        path: `addAlbums`,
        element: <AddAlbums />
      }
    ])


  export default router;