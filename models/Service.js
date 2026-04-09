const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Hair', 'Skin', 'Makeup', 'Bridal'], required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
  description: { type: String, required: true },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
