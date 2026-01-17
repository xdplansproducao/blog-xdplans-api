const mongoose = require('mongoose');

const ticketMessageSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  authorType: { type: String, enum: ['client', 'admin'], required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TicketMessage', ticketMessageSchema);
