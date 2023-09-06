import express from 'express';
import {
    getMusicalEntityPosts,
    getPosts,
    createNewPost,
    deletePost,
    deletePosts
} from '../controllers/post.mjs';

const router = express.Router();
router.get('/post/:musicalEntityId', getMusicalEntityPosts);
router.get('/post', getPosts);
router.post('/post', createNewPost);
router.delete('/post/:postId', deletePost);
router.delete('/post', deletePosts);

export default router;