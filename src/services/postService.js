const Post = require('../models/Post');

const createPost = async (userId, postData) => {
    const { title, body } = postData;
    const post = new Post({ userId, title, body });
    return await post.save();
};

const getAllPosts = async () => {
    return await Post.find().populate('userId', 'username');
};

const getPost = async (postId) => {
    return await Post.findById(postId).populate('userId', 'username');
};

const getUserPosts = async (userId) => {
    return await Post.find({ userId }).populate('userId', 'username');
};

const updatePost = async (postId, postData) => {
    const { title, body } = postData;
    return await Post.findByIdAndUpdate(postId, { title, body }, { new: true });
};

const deletePost = async (postId) => {
    return await Post.findByIdAndDelete(postId);
};

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    getUserPosts,
    updatePost,
    deletePost,
};
