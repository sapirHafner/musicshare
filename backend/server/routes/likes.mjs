import express from 'express';
import {
    changeUserLike,
    getLikes,
    getMusicalEntityLikes,
    createLikes
} from '../controllers/likes.mjs';

const router = express.Router();
router.get('/likes/:musicalEntityId', getMusicalEntityLikes);
router.get('/likes', getLikes);
router.post('/likes', createLikes);
router.put('/likes', changeUserLike);


export default router;