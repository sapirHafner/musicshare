const express = require('express');
const { getProfiles, getProfileByUserId, addProfile, getUsersProfileBoxInfo } = require('../controllers/profiles');

const router = express.Router();
router.get('/profiles', getProfiles);
router.get('/profiles/:userId', getProfileByUserId);
router.post('/profiles', addProfile);
router.get('/profiles/boxes/:userIds', getUsersProfileBoxInfo);

module.exports = router;