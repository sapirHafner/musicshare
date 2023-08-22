const express = require('express');
const { getAllSongs, addSong, deleteSong, getSongsFromIds } = require('../controllers/songs');

const router = express.Router();
router.get('/songs/:songIds', getSongsFromIds);
router.get('/songs', getAllSongs);
router.post('/songs', addSong);
router.delete('/songs/:songId', deleteSong);

module.exports = router;