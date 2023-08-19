import React from 'react';
import App from './App';
import { CookiesProvider, useCookies } from 'react-cookie';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateUser from './CreateUser';
import { addUser, addProfile ,addNewFriendsList } from './serverFunctions';


const MusicshareRouter = () => {
    const onSignUp = async (firstName, lastName, email, username, password) => {
      try {
        const userId = await addUser(username, password);
        await addProfile(userId, firstName, lastName, email);
        await addNewFriendsList(userId);
      } catch {}
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

    return <RouterProvider router = {router}/>
  }

  export default MusicshareRouter;