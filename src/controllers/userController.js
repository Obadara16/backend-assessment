const UserService = require('../services/userService');
const globalFunctions = require('../utils/globalFunctions');
const globalMessage = require('../utils/globalMessage');

const getUser = async (req, res) => {
    try {
        const user = await UserService.getUser(req.userId);
        if (!user) {
            return globalFunctions.resPayloadMessage(404, true, globalMessage.userNotFound, res);
        }
        globalFunctions.resPayloadData(200, false, user, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

module.exports = {
    getUser,
};
