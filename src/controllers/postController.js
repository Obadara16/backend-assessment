const PostService = require('../services/postService');
const globalFunctions = require('../utils/globalFunctions');
const globalMessage = require('../utils/globalMessage');

const createPost = async (req, res) => {
    try {
        const post = await PostService.createPost(req.userId, req.body);
        globalFunctions.resPayloadData(201, false, { message: globalMessage.postCreated, post }, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await PostService.getAllPosts();
        globalFunctions.resPayloadData(200, false, posts, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const getPost = async (req, res) => {
    try {
        const post = await PostService.getPost(req.params.id);
        if (!post) {
            return globalFunctions.resPayloadMessage(404, true, globalMessage.postNotFound, res);
        }
        globalFunctions.resPayloadData(200, false, post, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const getUserPosts = async (req, res) => {
    try {
        const posts = await PostService.getUserPosts(req.userId);
        globalFunctions.resPayloadData(200, false, posts, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await PostService.updatePost(req.params.id, req.body);
        if (!post) {
            return globalFunctions.resPayloadMessage(404, true, globalMessage.postNotFound, res);
        }
        globalFunctions.resPayloadData(200, false, { message: globalMessage.postUpdated, post }, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await PostService.deletePost(req.params.id);
        if (!post) {
            return globalFunctions.resPayloadMessage(404, true, globalMessage.postNotFound, res);
        }
        globalFunctions.resPayloadMessage(200, false, globalMessage.postDeleted, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    getUserPosts,
    updatePost,
    deletePost,
};
