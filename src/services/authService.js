const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET, REFRESH_SECRET } = require('../config/jwtConfig');
const globalFunctions = require('../utils/globalFunctions');
const globalMessage = require('../utils/globalMessage');

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, SECRET, { expiresIn: '24h' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: '7d' });
};

const register = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await globalFunctions.hashPassword(password);

  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
      throw new Error(globalMessage.emailAlreadyInUse);
  }

  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
      throw new Error(globalMessage.usernameAlreadyInUse);
  }

  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return { user, message: globalMessage.registerSuccessful };
};


const login = async (loginData) => {
    const { email, password } = loginData;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error(globalMessage.invalidEmailOrPassword);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error(globalMessage.invalidEmailOrPassword);
    }
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    return { token, refreshToken, message: globalMessage.loginSuccessful };
};



const refresh = async (refreshToken) => {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      const user = await User.findById(decoded.id);
      if (!user || user.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }
      const newToken = generateToken(user);
      const newRefreshToken = generateRefreshToken(user);
      user.refreshToken = newRefreshToken;
      await user.save();
      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  };
  



module.exports = {
    register,
    login,
    refresh,
};
