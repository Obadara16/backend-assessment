const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/jwtConfig');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token.split(' ')[1], SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized access' });
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

module.exports = authenticate;
