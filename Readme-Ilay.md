Social network name:
Musicshare

Additional pages:
Code of Conduct, about us

What additional features did you add:
Images (for users, artists, albums)
Ability to delete users/albums/artists.

What was hard to do:
For me, mostly designing, from planning the design to writing the css

Partner:
Sapir Hafner 209373620

We wrote it mostly together

Things I would add if I had more time:
Ability to edit posts / albums
Groups
Comments
Playlists
Direct messages

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
