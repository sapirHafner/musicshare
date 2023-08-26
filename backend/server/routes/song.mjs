import express from 'express';
import {
    getAllSongs,
    addSongs,
    deleteSong,
    getSongFromId,
} from '../controllers/song.mjs';

const router = express.Router();
router.get('/song/:songId', getSongFromId);
router.get('/song', getAllSongs);
router.post('/song', addSongs);
router.delete('/song/:songId', deleteSong);

export default router;