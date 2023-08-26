import express from 'express';
import {
    getProfiles,
    getProfileByUserId,
    addProfile,
    getUsersProfileBoxInfo,
    getUserProfileBoxInfoById
} from '../controllers/profiles.mjs';

const router = express.Router();
router.get('/profiles/boxes/:userId', getUserProfileBoxInfoById);
router.get('/profiles/boxes', getUsersProfileBoxInfo);
router.get('/profiles/:userId', getProfileByUserId);
router.get('/profiles', getProfiles);
router.post('/profiles', addProfile);

export default router;