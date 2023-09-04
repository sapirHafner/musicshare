import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const usersServerUrl = `${baseServerUrl}/users`

export const addUser = async (user) => {
    try {
      const response = await axios.post(usersServerUrl, user)
      return response.data;
    }
    catch (error) {
      if (error.response.status === 400){
        alert("user name already exists")
      }
      throw (error);
    }
}

export const getUser = async (username, password) => {
    const response = await axios.get(usersServerUrl, {
        params: {
            Username: username,
            Password: password
        }
    });
    return response.data;
};

export const fetchUserType = async (userId) =>
  (await axios.get(`${usersServerUrl}/${userId}`)).data;

export const logLogout = async (userId, userType) =>
    (axios.post(`${usersServerUrl}/logout`, {userId, userType}))