import express from 'express';
import {
    changeUserLike,
    getLikes,
    getMusicalEntityLikes,
    createLikes,
    deleteUserLikes,
    deleteMusicalEntityLikes
} from '../controllers/likes.mjs';

const router = express.Router();
router.get('/likes/:musicalEntityId', getMusicalEntityLikes);
router.get('/likes', getLikes);
router.post('/likes', createLikes);
router.put('/likes', changeUserLike);
router.delete('/likes/:id', deleteMusicalEntityLikes);
router.delete('/likes', deleteUserLikes);

export default router;