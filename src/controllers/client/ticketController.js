const Ticket = require('../../models/Ticket');
const TicketMessage = require('../../models/TicketMessage');
const Project = require('../../models/Project');
const { ticketCreateSchema, ticketMessageSchema } = require('../../validators/client');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');

exports.createTicket = async (req, res) => {
  try {
    const { subject, message, priority } = ticketCreateSchema.parse(req.body);
    let project = await Project.findOne({ clientId: req.user.id, status: 'active' });
    const ticket = await Ticket.create({
      clientId: req.user.id,
      projectId: project ? project._id : undefined,
      subject,
      priority
    });
    await TicketMessage.create({
      ticketId: ticket._id,
      authorType: 'client',
      authorId: req.user.id,
      message
    });
    return sendResponse(res, ticket, 'Ticket criado com sucesso');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.listTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tickets = await Ticket.find({ clientId: req.user.id })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    return sendResponse(res, tickets, 'Tickets do cliente');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, clientId: req.user.id });
    if (!ticket) return sendError(res, 404, 'Ticket não encontrado');
    const messages = await TicketMessage.find({ ticketId: ticket._id }).sort({ createdAt: 1 });
    return sendResponse(res, { ticket, messages }, 'Detalhe do ticket');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { message } = ticketMessageSchema.parse(req.body);
    const ticket = await Ticket.findOne({ _id: req.params.id, clientId: req.user.id });
    if (!ticket) return sendError(res, 404, 'Ticket não encontrado');
    if (ticket.status === 'closed') return sendError(res, 400, 'Ticket já está fechado');
    const msg = await TicketMessage.create({
      ticketId: ticket._id,
      authorType: 'client',
      authorId: req.user.id,
      message
    });
    return sendResponse(res, msg, 'Mensagem adicionada ao ticket');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.closeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, clientId: req.user.id },
      { status: 'closed' },
      { new: true }
    );
    if (!ticket) return sendError(res, 404, 'Ticket não encontrado');
    return sendResponse(res, ticket, 'Ticket fechado');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
