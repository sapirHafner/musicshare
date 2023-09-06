import express from 'express'
import {
    getAlbumById,
    getAlbums,
    addAlbum,
    deleteAlbum,
    updateAlbum,
    deleteAlbums
} from '../controllers/album.mjs'

const router = express.Router();
router.get('/album/:id', getAlbumById);
router.get('/album', getAlbums);
router.post('/album', addAlbum);
router.put('/album', updateAlbum);
router.delete('/album/:id', deleteAlbum);
router.delete('/album', deleteAlbums);


export default router;