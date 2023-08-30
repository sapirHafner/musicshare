import React from 'react';
import App from './App';
import {
  createBrowserRouter,
} from "react-router-dom";
import CreateUser from './Signing/CreateUser'
import Home from './Common/Home';
import LoginPage from './Signing/LoginPage';
import User from './User/User';
import Artist from './Artist/Artist'
import Friends from './User/Friends';
import FriendsRequests from './User/FriendsRequests';
import Library from './User/Library';
import NewPost from './Common/NewPost';
import Browse from './User/Browse';
import CreateArtist from './Signing/CreateArtist';
import AddAlbums from './Artist/AddAlbums';
import MyMusic from './Artist/MyMusic';
import AddNewAlbum from './Artist/AddNewAlbum';

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
        path: "user/:id",
        element: <User />
      },
      {
        path: 'artist/:id',
        element: <Artist />
      },
      {
        path: "friends",
        element: <Friends />
      },
      {
        path: "friendsRequests",
        element: <FriendsRequests />
      },
      {
        path: `library/:id`,
        element: <Library />
      },
      {
        path: `newpost`,
        element: <NewPost />
      },
      {
        path: `addAlbums`,
        element: <AddAlbums />
      },
      {
        path: `myMusic`,
        element: <MyMusic />
      },
      {
        path: `addNewAlbum`,
        element: <AddNewAlbum />
      }
    ])


  export default router;