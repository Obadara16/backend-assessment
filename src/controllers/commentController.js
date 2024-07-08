const CommentService = require('../services/commentService');
const globalFunctions = require('../utils/globalFunctions');
const globalMessage = require('../utils/globalMessage');

const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { body } = req.body;

        const comment = await CommentService.createComment(req.userId, { postId, body });
        globalFunctions.resPayloadData(201, false, { message: globalMessage.commentCreated, comment }, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await CommentService.getComments(req.params.postId);
        globalFunctions.resPayloadData(200, false, comments, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const updatedComment = await CommentService.updateComment(commentId, req.body);
        globalFunctions.resPayloadData(200, false, { message: globalMessage.commentUpdated, comment: updatedComment }, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await CommentService.deleteComment(commentId);
        globalFunctions.resPayloadMessage(200, false, globalMessage.commentDeleted, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment
};
