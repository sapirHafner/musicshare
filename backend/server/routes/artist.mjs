import express from 'express';
import {
    getArtist,
    getArtists,
    addArtist,
    deleteArtist,
    updateArtist
} from '../controllers/artist.mjs';

const router = express.Router();
router.get('/artist/:id', getArtist);
router.get('/artist', getArtists);
router.post('/artist', addArtist);
router.delete('/artist/:artistId', deleteArtist);
router.put('/artist', updateArtist)

export default router;