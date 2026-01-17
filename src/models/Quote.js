const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  title: { type: String, required: true },
  scope: { type: String },
  priceCents: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid'], default: 'pending' },
  validUntil: { type: Date },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', quoteSchema);
