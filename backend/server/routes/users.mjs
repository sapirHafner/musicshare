import express from 'express';
import {
    getUsers,
    getUser,
    addUser,
    logLogout,
    deleteUser,
    updateUser,
    validateUser
}
from '../controllers/users.mjs';

const router = express.Router();
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', addUser);
router.post('/users/logout', logLogout);
router.post('/users/validate', validateUser);
router.put('/users', updateUser)
router.delete('/users/:id', deleteUser);

export default router;