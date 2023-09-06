import express from 'express';
import {
    getUser,
    addUser,
    getUserType,
    logLogout,
    deleteUser,
    updateUser
}
from '../controllers/users.mjs';

const router = express.Router();
router.get('/users', getUser);
router.get('/users/:id', getUserType);
router.post('/users', addUser);
router.post('/users/logout', logLogout);
router.put('/users', updateUser)
router.delete('/users/:id', deleteUser);

export default router;