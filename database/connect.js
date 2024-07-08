const mongoose = require('mongoose');
const { MONGO_URI } = require('../src/config/dbConfig');

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); 
  }
};

module.exports = connectDatabase;
