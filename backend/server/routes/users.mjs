import express from 'express';
import {
    getUser,
    addUser }
from '../controllers/users.mjs';

const router = express.Router();
router.get('/users', getUser);
router.post('/users', addUser);

export default router;