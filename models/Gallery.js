const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, trim: true },
  imageUrl: { type: String, required: true },
  category: { type: String, default: 'General' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', gallerySchema);
