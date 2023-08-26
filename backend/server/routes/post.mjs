import express from 'express';
import {
    getPostByPostId,
    getPosts,
    createNewPost,
    deletePost
} from '../controllers/post.mjs';

const router = express.Router();
router.get('/post/:postId', getPostByPostId);
router.get('/post', getPosts);
router.post('/post', createNewPost);
router.delete('/post/:postId', deletePost);

export default router;