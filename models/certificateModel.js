

const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  uid: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true, // Assuming UID is unique per certificate
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt fields
});

exports.Certificate = mongoose.model("Certificate", certificateSchema);
