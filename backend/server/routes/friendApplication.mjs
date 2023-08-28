import express from 'express';
import {
    getFriendsApplicationsByUserId,
    addFriendRequestByUserId,
    removeFriendRequestByUserId
} from '../controllers/friendApplication.mjs';

const router = express.Router();
router.get('/friendApplication/:userId', getFriendsApplicationsByUserId);
router.post('/friendApplication/', addFriendRequestByUserId);
router.delete('/friendApplication/:userId', removeFriendRequestByUserId);

export default router