Social network name:
MusicShare

Additional pages:

What additional features did you add:
*The static pages: About Us, and Code of conduct.
*Friends Requests feature

What was hard to do:
For me it was very challenging to deal with things like JacaScript,React,html and css which I never got to deal with before at such a level for a project of this size.
There were many things to learn and apply in a very short time.

Partner:
Ilay Mor 208732487

We wrote it mostly together

Routes:
'/album/:id', getAlbum;
'/album', getAlbums;
'/album', addAlbum;
'/album', updateAlbum;
'/album/:id', deleteAlbum;
'/album', deleteAlbums;

'/artist/:id', getArtist;
'/artist', getArtists;
'/artist', addArtist;
'/artist/:artistId', deleteArtist;
'/artist', updateArtist

'/discovery/friends/:userId', getFriendsRecommendationForUser;

'/featureFlag/:name', getFeatureFlagByName;
'/featureFlag', getFeatureFlags;
'/featureFlag', createFeatureFlag;
'/featureFlag', updateFeatureFlag;
'/featureFlag/:name', deleteFeatureFlag

'/followers/:artistId', getArtistFollowers;
'/followers', getFollowers;
'/followers', createNewArtistFollowers;
'/followers/:artistId', deleteArtistFollowers;
'/followers', changeFollower

'/followers/user/:id', getUserFollows;
'/followers/user/:id', deleteUserFollows;

'/friendsRequests/:userId', getFriendsRequestsByUserId;
'/friendsRequests', createNewFriendsRequestsList;
'/friendsRequests', changeFriendsRequest;
'/friendsRequests/:userId', deleteUserFriendRequests;
'/post/:musicalEntityId', getMusicalEntityPosts;
'/post/user/:id', getUserPosts;

'/post', getPosts;
'/post', createNewPost;
'/post/:postId', deletePost;
'/post', deletePosts;
'/friends/:userId', getFriendsByUserId;
'/friends/:userId', addNewFriendsListForUser;
'/friends', changeFriendshipBetweenUsers;
'/friends/:userId', deleteUserFriends;
'/logs', getAllLogs;
'/profile/:userId', getProfileByUserId;
'/profile', getProfiles;
'/profile', addProfile;
'/profile/:userId', deleteProfile;
'/song/:songId', getSong;
'/song', getSongs;
'/song', addSongs;
'/song/:songId', deleteSong;
'/song', deleteSongs;
'/users', getUsers;
'/users/:id', getUser;
'/users', addUser;
'/users/logout', logLogout;
'/users/validate', validateUser;
'/users', updateUser
'/users/:id', deleteUser;