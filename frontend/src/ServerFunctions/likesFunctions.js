import axios from 'axios';
import { baseServerUrl } from './serverFunctions';

const likesServerUrl = `${baseServerUrl}/ikes`

export const addUserLike = async (userId, objectId) => {
    try{
       await axios.put(likesServerUrl, {
        add: true,
        UserId : userId,
        ObjectId : objectId
      })
    } catch(error){
      if (error.response.status === 404) {
          alert("user already likes post!")
      }
      throw(error);
    }
  }

export const removeUserLike = async (userId, objectId) => {
    try{
       await axios.put(likesServerUrl, {
        add: false,
        userId : userId,
        objectId : objectId
      })

    } catch(error){
      if (error.response.status === 404) {
          alert("user doesn't like post!")
      }
      throw(error);
    }
  }

export const fetchUserLikes = async (userId) => {
    try {
      const response = await axios.get(`${likesServerUrl}/user/${userId}`)
      return response.data;
    } catch (error) {}
  }
