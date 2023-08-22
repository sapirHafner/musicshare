const express = require('express')

const songsRoutes = require('./songs');
const profilesRoutes = require('./profiles');
const friendsRoutes = require('./friends');
const userRoutes = require('./users');
const likesRoutes = require('./likes');

const router = express.Router();
router.use(songsRoutes);
router.use(profilesRoutes);
router.use(friendsRoutes);
router.use(userRoutes);
router.use(likesRoutes);

module.exports = router;