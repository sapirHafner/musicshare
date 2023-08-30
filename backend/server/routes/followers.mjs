import express from 'express';
import {
    createNewArtistFollowers,
    changeFollower,
    getArtistFollowers,
    deleteArtistFollowers,
} from '../controllers/followers.mjs';

const router = express.Router();
router.get('/followers/:artistId', getArtistFollowers);
router.post('/followers', createNewArtistFollowers);
router.delete('/followers/:artistId', deleteArtistFollowers);
router.put('/followers', changeFollower)

export default router;