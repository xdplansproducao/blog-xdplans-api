const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  company: { type: String },
  document: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

clientSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.passwordHash;
    return ret;
  }
});

module.exports = mongoose.model('Client', clientSchema);
