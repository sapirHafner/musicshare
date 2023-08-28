const express = require('express');
const { getFriendsApplicationsByUserId, addFriendRequestByUserId, removeFriendRequestByUserId } = require('../controllers/friendApplication');

const router = express.Router();
router.get('/friendApplication/:userId', getFriendsApplicationsByUserId);
router.post('/friendApplication/', addFriendRequestByUserId);
router.delete('/friendApplication/:userId', removeFriendRequestByUserId);

module.exports = router;