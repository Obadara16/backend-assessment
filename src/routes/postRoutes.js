const express = require('express');
const {
  createPost,
  getAllPosts,
  getPost,
  getUserPosts,
  updatePost,
  deletePost
} = require('../controllers/postController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/create', authenticate, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPost);
router.get('/user/posts', authenticate, getUserPosts);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;
