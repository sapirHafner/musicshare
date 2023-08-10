const express = require('express');
const { getUserId, addUser } = require('../controllers/users');

const router = express.Router();
router.get('/users', getUserId);
router.post('/users', addUser);

module.exports = router;