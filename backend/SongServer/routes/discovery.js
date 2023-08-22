const express = require('express');
const {getFriendsRecommendationForUser} = require("../controllers/discovery");

const router = express.Router();
router.get('/discovery/friends/:userId', getFriendsRecommendationForUser);