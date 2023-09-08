import React from 'react';
import App from './App';
import {
  createBrowserRouter,
} from "react-router-dom";
import CreateUser from './Pages/CreateUser'
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import User from './Pages/User';
import Artist from './Pages/Artist'
import Friends from './Pages/Friends';
import FriendsRequests from './Pages/FriendsRequests';
import Library from './Pages/Library';
import NewPost from './Pages/NewPost';
import Browse from './Pages/Browse';
import CreateArtist from './Pages/CreateArtist';
import AddNewAlbum from './Pages/AddNewAlbum';
import Logout from './Pages/Logout';
import Album from './Pages/Album';
import Song from './Pages/Song'

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
        path: 'artist/:artistId',
        element: <Artist />
      },
      {
        path: 'album/:albumId',
        element: <Album />
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
        path: `addNewAlbum`,
        element: <AddNewAlbum />
      },
      {
        path: `logout`,
        element: <Logout />
      },
      {
        path: `song/:songId`,
        element: <Song />
      },
    ])


  export default router;