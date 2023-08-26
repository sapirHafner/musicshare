import express from 'express';
import {
    getArtistById,
    getArtists,
    addArtist,
    deleteArtist,
    updateArtist
} from '../controllers/artist.mjs';

const router = express.Router();
router.get('/artist/:id', getArtistById);
router.get('/artist', getArtists);
router.post('/artist', addArtist);
router.delete('/artist/:id', deleteArtist);
router.put('/artist', updateArtist)

export default router;