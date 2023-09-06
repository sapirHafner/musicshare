import express from 'express';
import {
    getFriendsRequestsByUserId,
    changeFriendsRequest,
    createNewFriendsRequestsArray,
    deleteUserFriendRequests
} from '../controllers/friendsRequests.mjs';

const router = express.Router();
router.get('/friendsRequests/:userId', getFriendsRequestsByUserId);
router.post('/friendsRequests', createNewFriendsRequestsArray);
router.put('/friendsRequests', changeFriendsRequest);
router.delete('/friendsRequests/:userId', deleteUserFriendRequests);

export default router;