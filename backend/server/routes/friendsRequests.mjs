import express from 'express';
import {
    getFriendsRequestsByUserId,
    addFriendRequestByUserId,
    removeFriendRequestByUserId,
    createNewFriendsRequestsArray
} from '../controllers/friendsRequests.mjs';

const router = express.Router();
router.get('/friendsRequests/:userId', getFriendsRequestsByUserId);
router.post('/friendsRequests', createNewFriendsRequestsArray);
router.put('/friendsRequests/', addFriendRequestByUserId);
router.delete('/friendsRequests/', removeFriendRequestByUserId);

export default router;