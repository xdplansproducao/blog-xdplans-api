const Ticket = require('../../models/Ticket');
const TicketMessage = require('../../models/TicketMessage');
const { adminTicketStatusSchema, adminTicketMessageSchema } = require('../../validators/admin');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');

exports.listTickets = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const tickets = await Ticket.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    return sendResponse(res, tickets, 'Lista de tickets');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = adminTicketStatusSchema.parse(req.body);
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!ticket) return sendError(res, 404, 'Ticket não encontrado');
    return sendResponse(res, ticket, 'Status do ticket atualizado');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { message } = adminTicketMessageSchema.parse(req.body);
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return sendError(res, 404, 'Ticket não encontrado');
    if (ticket.status === 'closed') return sendError(res, 400, 'Ticket já está fechado');
    const msg = await TicketMessage.create({
      ticketId: ticket._id,
      authorType: 'admin',
      authorId: req.user.id,
      message
    });
    return sendResponse(res, msg, 'Mensagem adicionada ao ticket');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
