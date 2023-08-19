import React from 'react';
import App from './App';
import { CookiesProvider, useCookies } from 'react-cookie';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateUser from './CreateUser';
import { addUser, addProfile ,addNewFriendsList } from './serverFunctions';
import Home from './Home';
  
const MusicshareRouter = () => {
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
        element: <CreateUser />
      },
      {
        path: "home",
        element: <Home />
      }
    ])

    return <RouterProvider router = {router}/>
  }

  export default MusicshareRouter;