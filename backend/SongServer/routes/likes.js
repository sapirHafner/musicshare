const express = require('express');
const {
    getLikingUsersByObjectId,
    changeUserLike,
    getAllLikesOfUserByUserId,
    addNewLikesListForObject
} = require('../controllers/likes');

const router = express.Router();
router.put('/likes', changeUserLike);
router.get('/likes/object/:objectId', getLikingUsersByObjectId);
router.post('/likes/:objectId', addNewLikesListForObject);
router.get('/likes/user/:userId', getAllLikesOfUserByUserId)

module.exports = router;