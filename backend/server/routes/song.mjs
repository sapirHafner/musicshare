import express from 'express';
import {
    getSongs,
    getSong,
    addSongs,
    deleteSong,
    deleteSongs
} from '../controllers/song.mjs';

const router = express.Router();
router.get('/song/:songId', getSong);
router.get('/song', getSongs);
router.post('/song', addSongs);
router.delete('/song/:songId', deleteSong);
router.delete('/song', deleteSongs);

export default router;