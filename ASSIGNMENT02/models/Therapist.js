// models/Therapist.js
// Spa therapist model (profiles shown to customers)

const mongoose = require('mongoose');

const TherapistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    photoUrl: {
      type: String,
      trim: true
    },
    specialties: {
      type: [String],
      default: []
    },
    bio: {
      type: String,
      trim: true
    },
    yearsExperience: {
      type: Number,
      default: 1
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Therapist', TherapistSchema);
