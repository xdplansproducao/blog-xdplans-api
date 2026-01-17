const Quote = require('../../models/Quote');
const Project = require('../../models/Project');
const { adminQuoteCreateSchema, adminQuoteStatusSchema } = require('../../validators/admin');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');

exports.createQuote = async (req, res) => {
  try {
    const data = adminQuoteCreateSchema.parse(req.body);
    const quote = await Quote.create(data);
    return sendResponse(res, quote, 'Orçamento criado com sucesso');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.updateQuoteStatus = async (req, res) => {
  try {
    const { status } = adminQuoteStatusSchema.parse(req.body);
    const quote = await Quote.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!quote) return sendError(res, 404, 'Orçamento não encontrado');
    // Se status virar paid, criar Project se não existir
    if (status === 'paid') {
      const existing = await Project.findOne({ quoteId: quote._id });
      if (!existing) {
        await Project.create({
          clientId: quote.clientId,
          quoteId: quote._id,
          status: 'active'
        });
      }
    }
    return sendResponse(res, quote, 'Status do orçamento atualizado');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.listQuotes = async (req, res) => {
  try {
    const { clientId, page = 1, limit = 20 } = req.query;
    const filter = clientId ? { clientId } : {};
    const quotes = await Quote.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    return sendResponse(res, quotes, 'Lista de orçamentos');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
