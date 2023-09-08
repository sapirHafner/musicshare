import express from 'express';
import {
    changeUserLike,
    getLikes,
    getMusicalEntityLikes,
    createLikes,
    deleteUserLikes,
    deleteMusicalEntityLikes,
    getUserLikes
} from '../controllers/likes.mjs';

const router = express.Router();
router.get('/likes/:musicalEntityId', getMusicalEntityLikes);
router.get('/likes', getLikes);
router.post('/likes', createLikes);
router.put('/likes', changeUserLike);
router.delete('/likes/:id', deleteMusicalEntityLikes);

router.get('/likes/user/:id', getUserLikes);
router.delete('/likes/user/:id', deleteUserLikes);

export default router;