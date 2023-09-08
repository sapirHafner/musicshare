import express from 'express';
import {
    getProfiles,
    getProfileByUserId,
    addProfile,
    deleteProfile
} from '../controllers/profile.mjs';

const router = express.Router();
router.get('/profile/:userId', getProfileByUserId);
router.get('/profile', getProfiles);
router.post('/profile', addProfile);
router.delete('/profile/:userId', deleteProfile);

export default router;