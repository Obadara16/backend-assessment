const express = require('express');
const { getUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/profile', authenticate, getUser);

module.exports = router;
