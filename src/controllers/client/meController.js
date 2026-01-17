const Client = require('../../models/Client');
const { clientUpdateSchema } = require('../../validators/client');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');

exports.getMe = async (req, res) => {
  try {
    const client = await Client.findById(req.user.id);
    if (!client) return sendError(res, 404, 'Cliente não encontrado');
    return sendResponse(res, client, 'Dados do cliente');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.updateMe = async (req, res) => {
  try {
    const data = clientUpdateSchema.parse(req.body);
    const client = await Client.findByIdAndUpdate(req.user.id, data, { new: true });
    if (!client) return sendError(res, 404, 'Cliente não encontrado');
    return sendResponse(res, client, 'Dados atualizados');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
