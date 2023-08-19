import axios from 'axios';

const baseServerUrl = "http://localhost:4000"
const usersServerUrl = `${baseServerUrl}/users`
const profilesServerUrl = `${baseServerUrl}/profiles`
const friendsServerUrl = `${baseServerUrl}/friends`
const songsServerUrl = `${baseServerUrl}/songs`

const addUser = async (username, password) => {
    try {
      const response = await axios.post(usersServerUrl, {
        Username: username,
        Password: password
      })
      return response.data;
    } catch (error) {
      if (error.response.status === 400){
        alert("user name already exists")
      }
      throw (error);
    }
  }

  const addProfile = async (userId, firstName, lastName, email) => {
    await axios.post(profilesServerUrl, {
      UserId: userId,
      FirstName: firstName,
      LastName: lastName,
      Email: email
    })
  }

  const addNewFriendsList = async (userId) => {
    await axios.post(`${friendsServerUrl}/${userId}`);
  }


  const getUserId = async (username, password) => {
    const response = await axios.get("http://localhost:4000/users", {
        params: {
            Username: username,
            Password: password
        }
    });
    return response.data;
};

const fetchSongs = async () => {
  const response = await axios.get(songsServerUrl);
  return response.data;
};

const fetchUserProfile = async (userId) => {
  const response = await axios.get(profilesServerUrl + "/" + userId);
  return response.data;
};

const fetchFriends = async (userId) => {
  const response = await axios.get(friendsServerUrl + "/" + userId);
  const friendsIds = response.data;
  const friendsProfiles = Promise.all(friendsIds.map(async (friendId) => {
      const response = await axios.get(profilesServerUrl + "/" + friendId);
      return response.data;
  }));
  return friendsProfiles;
};

export {
  addUser,
  addProfile,
  addNewFriendsList,
  getUserId,
  fetchSongs,
  fetchUserProfile,
  fetchFriends
};