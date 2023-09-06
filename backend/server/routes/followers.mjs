import express from 'express';
import {
    createNewArtistFollowers,
    changeFollower,
    getArtistFollowers,
    deleteArtistFollowers,
    getFollowers,
    deleteFollowers
} from '../controllers/followers.mjs';

const router = express.Router();
router.get('/followers/:artistId', getArtistFollowers);
router.get('/followers', getFollowers);
router.post('/followers', createNewArtistFollowers);
router.delete('/followers/:artistId', deleteArtistFollowers);
router.delete('/followers', deleteFollowers);
router.put('/followers', changeFollower)

export default router;