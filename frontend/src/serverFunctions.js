import axios from 'axios';

const baseServerUrl = "http://localhost:4000"
const usersServerUrl = `${baseServerUrl}/users`
const profilesServerUrl = `${baseServerUrl}/profiles`
const friendsServerUrl = `${baseServerUrl}/friends`
const songsServerUrl = `${baseServerUrl}/songs`
const likesServerUrl = `${baseServerUrl}/likes`
const discoveryServerUrl = `${baseServerUrl}/discovery`
const postServerUrl = `${baseServerUrl}/post`
const artistsServerUrl = `${baseServerUrl}/artists`

const createNewPost = async (post) =>
    await axios.post(postServerUrl, post);


const fetchMusicalObjects = async (type, objectIds) => {
  if (type === "song") {
    return await fetchSongs(objectIds)
  }
}

const fetchMusicalObject = async (type, objectId) => {
  if (type == "song") {
    return await fetchSong(objectId);
  }
}

const fetchUserProfileBox = async (userId) =>
  (await axios.get(`${profilesServerUrl}/boxes/${userId}`)).data;


const fetchUserPosts = async (userId) => {
  const response = await axios.get(`${postServerUrl}/user/${userId}`);
  const userPosts = await Promise.all(response.data.map(async post => {
    const user = await fetchUserProfileBox(post.UserId)
    const musicalObject = await fetchMusicalObject(post.MusicalObject.Type, post.MusicalObject.Id)
    return {
      title: post.Title,
      content: post.Content,
      user,
      musicalObject
    }
  }));
  return userPosts;
}

const addUserLike = async (userId, objectId) => {
  try{
     await axios.put(likesServerUrl, {
      add: true,
      userId : userId,
      objectId : objectId
    })
  } catch(error){
    if (error.response.status === 404) {
        alert("user already likes post!")
    }
    throw(error);
  }
}

const fetchDiscoveryProfiles = async (userId) => {
    const response = await axios.get(`${discoveryServerUrl}/friends/${userId}`)
    const profileBoxes = await fetchUsersProfileBoxes(response.data)
    return profileBoxes
}

const fetchUsersProfileBoxes = async (userIds) => {
  const response = await axios.get(`${profilesServerUrl}/boxes?id=${userIds.join()}`)
  return response.data;
}

const removeUserLike = async (userId, objectId) => {
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

const fetchUserLikes = async (userId) => {
  try {
    const response = await axios.get(`${likesServerUrl}/user/${userId}`)
    return response.data;
  } catch (error) {}
}

const fetchSongs = async (songIds) => {
  const url = songIds !== undefined ? `${songsServerUrl}?id=${songIds.join()}` : songsServerUrl;
  const response = await axios.get(url);
  return response.data
}

const fetchArtists = async (artistsIds) => {
  const url = artistsIds !== undefined ? `${artistsServerUrl}?id=${fetchArtists.join()}` : artistsServerUrl;
  const response = await axios.get(url);
  return response.data
}


const fetchSong = async (songId) =>
  (await axios.get(`${songsServerUrl}/${songId}`)).data;

const addUser = async (username, password) => {
    try {
      const response = await axios.post(usersServerUrl, {
        Username: username,
        Password: password
      })
      return response.data;
    }
    catch (error) {
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
  addUserLike,
  removeUserLike,
  addUser,
  addProfile,
  addNewFriendsList,
  getUserId,
  fetchSongs,
  fetchUserProfile,
  fetchFriends,
  fetchUserLikes,
  fetchDiscoveryProfiles,
  fetchUsersProfileBoxes,
  createNewPost,
  fetchMusicalObjects,
  fetchUserPosts,
  fetchArtists
};