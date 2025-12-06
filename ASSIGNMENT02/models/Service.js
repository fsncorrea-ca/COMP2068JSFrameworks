// models/Service.js
// Spa service model (massages, facials, etc.)

const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      sparse: true
    },
    description: {
      type: String,
      trim: true
    },
    durationMins: {
      type: Number
    },
    basePrice: {
      type: Number
    },
    tags: [String],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', ServiceSchema);
