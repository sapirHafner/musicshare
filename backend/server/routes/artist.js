const express = require('express');
const {
    getArtistById,
    getArtists,
    addArtist,
    deleteArtist,
    updateArtist
} = require('../controllers/artist');

const router = express.Router();
router.get('/artist/:id', getArtistById);
router.get('/artist', getArtists);
router.post('/artist', addArtist);
router.delete('/artist', deleteArtist);
router.put('/artist', updateArtist)

module.exports = router;