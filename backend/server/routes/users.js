const express = require('express');
const { getUser, addUser } = require('../controllers/users');

const router = express.Router();
router.get('/users', getUser);
router.post('/users', addUser);

module.exports = router;