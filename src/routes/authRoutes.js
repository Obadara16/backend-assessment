const express = require('express');
const { register, login, refresh} = require('../controllers/authController');
const rateLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/register', rateLimiter, register);
router.post('/login', rateLimiter, login);
router.post('/refresh', refresh);

module.exports = router;
