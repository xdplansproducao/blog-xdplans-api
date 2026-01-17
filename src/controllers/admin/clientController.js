const Client = require('../../models/Client');
const bcrypt = require('bcrypt');
const { adminClientCreateSchema, adminClientUpdateSchema } = require('../../validators/admin');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');

exports.createClient = async (req, res) => {
  try {
    const data = adminClientCreateSchema.parse(req.body);
    const password = data.temporaryPassword || Math.random().toString(36).slice(-8);
    const passwordHash = await bcrypt.hash(password, 10);
    const client = await Client.create({ ...data, passwordHash });
    return sendResponse(res, client, 'Cliente criado com sucesso');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.listClients = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const clients = await Client.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    return sendResponse(res, clients, 'Lista de clientes');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return sendError(res, 404, 'Cliente não encontrado');
    return sendResponse(res, client, 'Detalhe do cliente');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.updateClient = async (req, res) => {
  try {
    const data = adminClientUpdateSchema.parse(req.body);
    const client = await Client.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!client) return sendError(res, 404, 'Cliente não encontrado');
    return sendResponse(res, client, 'Cliente atualizado');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
