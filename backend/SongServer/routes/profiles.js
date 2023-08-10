const express = require('express');
const { getProfiles, getProfileByUserId, addProfile } = require('../controllers/profiles');

const router = express.Router();
router.get('/profiles', getProfiles);
router.get('/profiles/:userId', getProfileByUserId);
router.post('/profiles', addProfile);

module.exports = router;