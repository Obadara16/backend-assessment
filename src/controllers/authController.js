const AuthService = require('../services/authService');
const globalFunctions = require('../utils/globalFunctions');
const globalMessage = require('../utils/globalMessage');

const register = async (req, res) => {
    try {
        const result = await AuthService.register(req.body);
        globalFunctions.resPayloadData(201, false, { message: globalMessage.registerSuccessful }, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const login = async (req, res) => {
    try {
        const result = await AuthService.login(req.body);
        globalFunctions.resPayloadData(200, false, { message: globalMessage.loginSuccessful, token: result.token, refreshToken: result.refreshToken }, res);
    } catch (err) {
        globalFunctions.resPayloadMessage(400, true, err.message, res);
    }
};

const refresh = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refresh(refreshToken);
      res.status(200).json({
        error: false,
        status: 'success',
        status_code: 200,
        data: {
          token: result.token,
          refreshToken: result.refreshToken
        }
      });
    } catch (err) {
      res.status(401).json({
        error: true,
        status: 'error',
        status_code: 401,
        message: err.message
      });
    }
  };
  

module.exports = {
    register,
    login,
    refresh,
};
