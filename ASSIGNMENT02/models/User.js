// models/User.js
// User model for Serenity Spa authentication (local + GitHub)

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    // Local authentication
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    passwordHash: {
      type: String
    },

    // GitHub OAuth
    githubId: {
      type: String
    },

    // Display name for profile or dashboard
    displayName: {
      type: String
    },

    // Optional: define user roles (admin or staff)
    role: {
      type: String,
      enum: ['admin', 'staff'],
      default: 'staff'
    }
  },
  { timestamps: true } // createdAt, updatedAt
);

// Export the model so Passport can use it
module.exports = mongoose.model('User', UserSchema);
