const jwt = require('jsonwebtoken');
const Client = require('../models/Client');
const { sendError } = require('./errorHandler');

const JWT_SECRET = process.env.JWT_CLIENT_SECRET;

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'Token não fornecido');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'client') return sendError(res, 403, 'Acesso negado');
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return sendError(res, 401, 'Token inválido');
  }
};
