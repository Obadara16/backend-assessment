const express = require('express');
const router = express.Router();
const { createComment, getComments, updateComment, deleteComment } = require('../controllers/commentController');
const authenticate = require('../middlewares/authenticate');

router.post('/create/:postId', authenticate, createComment);

router.get('/get/:postId', getComments);

router.put('/update/:commentId', authenticate, updateComment);

router.delete('/delete/:commentId', authenticate, deleteComment);

module.exports = router;
