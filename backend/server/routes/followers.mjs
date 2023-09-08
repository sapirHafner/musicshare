import express from 'express';
import {
    createNewArtistFollowers,
    changeFollower,
    getArtistFollowers,
    getUserFollows,
    deleteArtistFollowers,
    getFollowers,
    deleteUserFollows
} from '../controllers/followers.mjs';

const router = express.Router();
router.get('/followers/:artistId', getArtistFollowers);
router.get('/followers', getFollowers);
router.post('/followers', createNewArtistFollowers);
router.delete('/followers/:artistId', deleteArtistFollowers);
router.put('/followers', changeFollower)

router.get('/followers/user/:id', getUserFollows);
router.delete('/followers/user/:id', deleteUserFollows);

export default router;