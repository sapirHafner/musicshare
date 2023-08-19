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

const onSignUp = (firstName, lastName, email, userName, password) => {
  console.log(email)
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

