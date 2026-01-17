const Quote = require('../../models/Quote');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');

exports.listQuotes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const quotes = await Quote.find({ clientId: req.user.id })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    return sendResponse(res, quotes, 'Orçamentos do cliente');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.getQuote = async (req, res) => {
  try {
    const quote = await Quote.findOne({ _id: req.params.id, clientId: req.user.id });
    if (!quote) return sendError(res, 404, 'Orçamento não encontrado');
    return sendResponse(res, quote, 'Detalhe do orçamento');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.createQuote = async (req, res) => {
  try {
    const { clientQuoteCreateSchema } = require('../../validators/client');
    const data = clientQuoteCreateSchema.parse(req.body);
    
    const quote = await Quote.create({
      ...data,
      clientId: req.user.id,
      status: 'pending'
    });
    
    return sendResponse(res, quote, 'Solicitação de orçamento criada com sucesso', 201);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
