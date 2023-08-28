const express = require('express')

const songsRoutes = require('./songs');
const profilesRoutes = require('./profiles');
const friendsRoutes = require('./friends');
const userRoutes = require('./users');
const likesRoutes = require('./likes');
const discoveryRoutes = require('./discovery');
const postRoutes = require('./post')
const artistRoutes = require('./artist');
const friendsApplicationsRoutes = require('./friendApplication');

const router = express.Router();
router.use(songsRoutes);
router.use(profilesRoutes);
router.use(friendsRoutes);
router.use(userRoutes);
router.use(likesRoutes);
router.use(discoveryRoutes);
router.use(postRoutes);
router.use(artistRoutes);
router.use(friendsApplicationsRoutes)

module.exports = router;