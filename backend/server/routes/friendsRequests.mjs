import express from 'express';
import {
    getFriendsRequestsByUserId,
    addFriendRequestByUserId,
    removeFriendRequestByUserId
} from '../controllers/friendsRequests.mjs';

const router = express.Router();
router.get('/friendsRequests/:userId', getFriendsRequestsByUserId);
router.post('/friendsRequests/', addFriendRequestByUserId);
router.delete('/friendsRequests/', removeFriendRequestByUserId);

export default router;