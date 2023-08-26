const express = require('express');
const {
    getProfiles,
    getProfileByUserId,
    addProfile,
    getUsersProfileBoxInfo,
    getUserProfileBoxInfoById
} = require('../controllers/profiles');

const router = express.Router();
router.get('/profiles/boxes/:userId', getUserProfileBoxInfoById);
router.get('/profiles/boxes', getUsersProfileBoxInfo);
router.get('/profiles/:userId', getProfileByUserId);
router.get('/profiles', getProfiles);
router.post('/profiles', addProfile);

module.exports = router;