import express from 'express';
import {
    getFriendsApplicationsByUserId,
    addFriendRequestByUserId,
    removeFriendRequestByUserId
} from '../controllers/friendsRequests.mjs';

const router = express.Router();
router.get('/friendsRequests/:userId', getFriendsApplicationsByUserId);
router.post('/friendsRequests/', addFriendRequestByUserId);
router.delete('/friendsRequests/', removeFriendRequestByUserId);

export default router