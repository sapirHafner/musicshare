const express = require('express');
const {
    getPostByPostId,
    getUserPostsByUserIdSortedByTimeDesc,
    createNewPost,
    deletePost
} = require('../controllers/post');

const router = express.Router();
router.get('/post/:postId', getPostByPostId);
router.get('/post/user/:userId', getUserPostsByUserIdSortedByTimeDesc);
router.post('/post', createNewPost);
router.delete('/post/:postId', deletePost);

module.exports = router;