import express from 'express'
import {
    getAlbumById,
    getAlbums,
    addAlbum,
    deleteAlbum,
    updateAlbum
} from '../controllers/album.mjs'

const router = express.Router();
router.get('/album/:id', getAlbumById);
router.get('/album', getAlbums);
router.post('/album', addAlbum);
router.put('/album', updateAlbum);
router.delete('/album/:id', deleteAlbum);

export default router;