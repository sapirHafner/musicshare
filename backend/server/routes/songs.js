const express = require('express');
const {
    getAllSongs,
    addSong,
    deleteSong,
    getSongFromId,
} = require('../controllers/songs');

const router = express.Router();
router.get('/songs/:songId', getSongFromId);
router.get('/songs', getAllSongs);
router.post('/songs', addSong);
router.delete('/songs/:songId', deleteSong);

module.exports = router;