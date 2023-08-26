import express from 'express';
import {
    getFriendsRecommendationForUser
} from '../controllers/discovery.mjs'

const router = express.Router();
router.get('/discovery/friends/:userId', getFriendsRecommendationForUser);

export default router;