const express = require('express');
const { getAllSongs, addSong, deleteSong } = require('../controllers/songs');

const router = express.Router();
router.get('/songs', getAllSongs);
router.post('/songs', addSong);
router.delete('/songs/:songId', deleteSong);

module.exports = router;