// config/db.js
const mongoose = require('mongoose');

// This function connects to MongoDB using the provided URI
async function connectDB(uri) {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // stop app if DB connection fails
  }
}

module.exports = connectDB;
