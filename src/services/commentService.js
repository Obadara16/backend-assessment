const Comment = require('../models/Comment');

const createComment = async (userId, commentData) => {
    const { postId, body } = commentData;
    const comment = new Comment({ postId, userId, body });
    await comment.save();
  
    const populatedComment = await Comment.findById(comment._id).populate('userId', 'username');
    
    return populatedComment;
  };
  

const getComments = async (postId) => {
    return await Comment.find({ postId }).populate('userId', 'username');
};

const updateComment = async (commentId, commentData) => {
    return await Comment.findByIdAndUpdate(commentId, commentData, { new: true });
};

const deleteComment = async (commentId) => {
    await Comment.findByIdAndDelete(commentId);
};

module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment
};
