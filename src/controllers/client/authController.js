const Client = require('../../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { clientLoginSchema, clientRegisterSchema, clientChangePasswordSchema } = require('../../validators/client');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');
const rateLimit = require('../../middlewares/rateLimit');

const JWT_SECRET = process.env.JWT_CLIENT_SECRET || process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_CLIENT_EXPIRES || '7d';

exports.login = [
  rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }),
  async (req, res) => {
    try {
      console.log('\n' + '🔐'.repeat(40));
      console.log('🔐 PROCESSANDO LOGIN DE CLIENTE');
      console.log('🔐'.repeat(40));
      
      // Validação dos dados
      console.log('📋 Validando dados de entrada...');
      const { email, password } = clientLoginSchema.parse(req.body);
      console.log(`✅ Dados válidos - Email: ${email}`);
      
      // Buscar cliente
      console.log('🔍 Buscando cliente no banco de dados...');
      const client = await Client.findOne({ email });
      
      if (!client) {
        console.log(`⚠️ Cliente não encontrado com email: ${email}`);
        return sendError(res, 401, 'Credenciais inválidas');
      }
      console.log(`✅ Cliente encontrado - ID: ${client._id}`);
      
      // Verificar senha
      console.log('🔑 Comparando senha...');
      const valid = await bcrypt.compare(password, client.passwordHash);
      
      if (!valid) {
        console.log('❌ Senha incorreta');
        return sendError(res, 401, 'Credenciais inválidas');
      }
      console.log('✅ Senha válida');
      
      // Gerar token
      console.log(`🎟️ Gerando JWT token (expiração: ${JWT_EXPIRES})...`);
      const token = jwt.sign({ id: client._id, role: 'client' }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      console.log('✅ Token gerado com sucesso');
      
      return sendResponse(res, { token }, 'Login realizado com sucesso');
    } catch (err) {
      console.error('❌ ERRO NO LOGIN:', err.message);
      return sendError(res, 400, err.message);
    }
  }
];

exports.register = [
  rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }),
  async (req, res) => {
    try {
      if (!JWT_SECRET) {
        return sendError(res, 500, 'JWT_SECRET n\u00e3o configurado');
      }

      const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const raw = req.body || {};
      const payload = clientRegisterSchema.parse({
        name: raw.name ?? raw.fullName ?? raw.nome ?? raw.nomeCompleto,
        email: raw.email,
        password: raw.password ?? raw.senha,
        confirmPassword: raw.confirmPassword ?? raw.confirmarSenha ?? raw.passwordConfirmation,
        phone: raw.phone ?? raw.telefone,
        company: raw.company ?? raw.empresa,
        document: raw.document ?? raw.cpfCnpj ?? raw.cpf_cnpj ?? raw.cnpjCpf
      });
      const email = payload.email.trim().toLowerCase();
      const name = payload.name.trim();

      const existing = await Client.findOne({ email: new RegExp(`^${escapeRegex(email)}$`, 'i') });
      if (existing) {
        return sendError(res, 409, 'E-mail j\u00e1 cadastrado');
      }

      const passwordHash = await bcrypt.hash(payload.password, 10);

      const client = await Client.create({
        name,
        email,
        phone: payload.phone,
        company: payload.company,
        document: payload.document,
        status: 'active',
        passwordHash
      });

      const token = jwt.sign({ id: client._id, role: 'client' }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

      return sendResponse(res, { token, client }, 'Conta criada com sucesso');
    } catch (err) {
      if (err?.code === 11000) {
        return sendError(res, 409, 'E-mail j\u00e1 cadastrado');
      }
      return sendError(res, 400, err.message);
    }
  }
];

exports.changePassword = async (req, res) => {
  try {
    console.log('\n' + '🔑'.repeat(40));
    console.log('🔑 ALTERANDO SENHA DO CLIENTE');
    console.log('🔑'.repeat(40));
    
    console.log('📋 Validando dados...');
    const { currentPassword, newPassword } = clientChangePasswordSchema.parse(req.body);
    console.log('✅ Dados válidos');
    
    console.log(`🔍 Buscando cliente - ID: ${req.user.id}`);
    const client = await Client.findById(req.user.id);
    
    if (!client) {
      console.log('❌ Cliente não encontrado');
      return sendError(res, 404, 'Cliente não encontrado');
    }
    console.log('✅ Cliente encontrado');
    
    console.log('🔑 Verificando senha atual...');
    const valid = await bcrypt.compare(currentPassword, client.passwordHash);
    
    if (!valid) {
      console.log('❌ Senha atual incorreta');
      return sendError(res, 401, 'Senha atual incorreta');
    }
    console.log('✅ Senha atual válida');
    
    console.log('🔐 Criptografando nova senha...');
    client.passwordHash = await bcrypt.hash(newPassword, 10);
    
    console.log('💾 Salvando alterações no banco...');
    await client.save();
    console.log('✅ Senha alterada com sucesso');
    
    return sendResponse(res, null, 'Senha alterada com sucesso');
  } catch (err) {
    console.error('❌ ERRO NA ALTERAÇÃO DE SENHA:', err.message);
    return sendError(res, 400, err.message);
  }
};
