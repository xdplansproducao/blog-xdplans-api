const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  quoteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
  status: { type: String, enum: ['active', 'paused', 'completed', 'cancelled'], default: 'active' },
  phase: { type: String },
  notes: { type: String },
  dueAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
