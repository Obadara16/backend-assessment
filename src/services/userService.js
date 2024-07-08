const User = require('../models/User');

const getUser = async (userId) => {
    return await User.findById(userId).select('-password');
};

module.exports = {
    getUser,
};
