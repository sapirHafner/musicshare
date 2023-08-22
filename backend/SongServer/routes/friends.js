const express = require('express');
const { getFriendsByUserId, addNewFriendsListForUser, addFriendshipBetweenUsers } = require('../controllers/friends');

const router = express.Router();
router.get('/friends/:userId', getFriendsByUserId);
router.post('/friends/:userId', addNewFriendsListForUser);
router.post('/friends', addFriendshipBetweenUsers);

module.exports = router;