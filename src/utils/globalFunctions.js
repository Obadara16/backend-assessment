const bcrypt = require('bcrypt');
const axios = require('axios');


const emailPattern = () => {
  return new Promise((resolve) => {
    const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    resolve(email);
  });
};


const httpCall = (config) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};


const hashPassword = (password) => {
  return new Promise(async (resolve) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    resolve(hash);
  });
};




const resPayloadData = (code, error, data, res) => {
  res.status(code).json({
    status_code: code,
    status: error ? "error" : "success",
    error: error,
    data: data
  });
};


const resPayloadMessage = (code, error, message, res) => {
  res.status(code).json({
    status_code: code,
    status: error ? "error" : "success",
    error: error,
    message: message
  });
};

module.exports = {
  emailPattern,
  httpCall,
  hashPassword,
  resPayloadData,
  resPayloadMessage
};
