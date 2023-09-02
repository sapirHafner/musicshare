import express from 'express';
import {
    getUser,
    addUser,
    getUserType
}
from '../controllers/users.mjs';

const router = express.Router();
router.get('/users', getUser);
router.get('/users/:id', getUserType);
router.post('/users', addUser);

export default router;