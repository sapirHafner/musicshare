import express from 'express';
import {
    getFriendsByUserId,
    addNewFriendsListForUser,
    addFriendshipBetweenUsers
} from '../controllers/friends.mjs';

const router = express.Router();
router.get('/friends/:userId', getFriendsByUserId);
router.post('/friends/:userId', addNewFriendsListForUser);
router.post('/friends', addFriendshipBetweenUsers);

export default router;