const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true },
  discountType: { type: String, enum: ['percentage', 'flat'], default: 'percentage' },
  validFrom: { type: Date, required: true },
  validTill: { type: Date, required: true },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Offer', offerSchema);
