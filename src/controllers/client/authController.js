const Client = require('../../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { clientLoginSchema, clientChangePasswordSchema } = require('../../validators/client');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');
const rateLimit = require('../../middlewares/rateLimit');

const JWT_SECRET = process.env.JWT_CLIENT_SECRET;
const JWT_EXPIRES = process.env.JWT_CLIENT_EXPIRES || '7d';

exports.login = [
  rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }),
  async (req, res) => {
    try {
      const { email, password } = clientLoginSchema.parse(req.body);
      const client = await Client.findOne({ email });
      if (!client) return sendError(res, 401, 'Credenciais inválidas');
      const valid = await bcrypt.compare(password, client.passwordHash);
      if (!valid) return sendError(res, 401, 'Credenciais inválidas');
      const token = jwt.sign({ id: client._id, role: 'client' }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      return sendResponse(res, { token }, 'Login realizado com sucesso');
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  }
];

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = clientChangePasswordSchema.parse(req.body);
    const client = await Client.findById(req.user.id);
    if (!client) return sendError(res, 404, 'Cliente não encontrado');
    const valid = await bcrypt.compare(currentPassword, client.passwordHash);
    if (!valid) return sendError(res, 401, 'Senha atual incorreta');
    client.passwordHash = await bcrypt.hash(newPassword, 10);
    await client.save();
    return sendResponse(res, null, 'Senha alterada com sucesso');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
