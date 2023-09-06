import express from 'express';
import {
    getFriendsByUserId,
    addNewFriendsListForUser,
    changeFriendshipBetweenUsers,
    deleteUserFriends
} from '../controllers/friends.mjs';

const router = express.Router();
router.get('/friends/:userId', getFriendsByUserId);
router.post('/friends/:userId', addNewFriendsListForUser);
router.put('/friends', changeFriendshipBetweenUsers);
router.delete('/friends/:userId', deleteUserFriends);

export default router;