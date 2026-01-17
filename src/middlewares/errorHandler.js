/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const { z } = require('zod');

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Erro interno do servidor';
  let details = null;

  // Tratamento de erro de validação Zod
  if (err instanceof z.ZodError) {
    statusCode = 400;
    message = 'Dados inválidos enviados';
    details = err.errors.map(e => ({
      campo: e.path.join('.'),
      mensagem: e.message,
      tipo: e.code,
    }));
  }
  // Tratamento de AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Tratamento de erro padrão
  else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log detalhado no console
  console.error('\n' + '='.repeat(80));
  console.error('❌ ERRO DETECTADO');
  console.error('='.repeat(80));
  console.error(`📍 Rota: ${req.method} ${req.path}`);
  console.error(`📌 Status HTTP: ${statusCode}`);
  console.error(`💬 Mensagem: ${message}`);
  
  if (details) {
    console.error('📋 Detalhes da Validação:');
    details.forEach(d => {
      console.error(`   • Campo: "${d.campo}"`);
      console.error(`     └─ Erro: ${d.mensagem}`);
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.error('\n🔍 Stack Trace:');
    console.error(err.stack);
  }
  console.error('='.repeat(80) + '\n');

  // Resposta ao cliente
  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
  });
};

const sendError = (res, statusCode, message) => {
  console.error('\n' + '='.repeat(80));
  console.error('❌ ERRO ENVIADO AO CLIENTE');
  console.error('='.repeat(80));
  console.error(`📌 Status HTTP: ${statusCode}`);
  console.error(`💬 Mensagem: ${message}`);
  console.error('='.repeat(80) + '\n');
  
  res.status(statusCode).json({
    success: false,
    message,
  });
};

const sendResponse = (res, data = null, message = 'Sucesso') => {
  console.log('\n' + '='.repeat(80));
  console.log('✅ RESPOSTA COM SUCESSO');
  console.log('='.repeat(80));
  console.log(`💬 Mensagem: ${message}`);
  if (data) {
    console.log(`📦 Dados:`, JSON.stringify(data, null, 2));
  }
  console.log('='.repeat(80) + '\n');
  
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

// Middleware para logar requisições
const requestLogger = (req, res, next) => {
  console.log('\n' + '═'.repeat(80));
  console.log('📨 REQUISIÇÃO RECEBIDA');
  console.log('═'.repeat(80));
  console.log(`⏰ Horário: ${new Date().toLocaleString('pt-BR')}`);
  console.log(`🌐 Método: ${req.method}`);
  console.log(`📍 Rota: ${req.path}`);
  console.log(`🔗 URL Completa: ${req.originalUrl}`);
  console.log(`🔐 IP do Cliente: ${req.ip}`);
  
  if (req.body && Object.keys(req.body).length > 0) {
    // Não logar senhas ou tokens
    const bodyLog = JSON.parse(JSON.stringify(req.body));
    if (bodyLog.password) bodyLog.password = '***PROTEGIDO***';
    if (bodyLog.token) bodyLog.token = '***PROTEGIDO***';
    if (bodyLog.jwt) bodyLog.jwt = '***PROTEGIDO***';
    if (bodyLog.currentPassword) bodyLog.currentPassword = '***PROTEGIDO***';
    if (bodyLog.newPassword) bodyLog.newPassword = '***PROTEGIDO***';
    console.log(`📋 Body:\n${JSON.stringify(bodyLog, null, 2)}`);
  }
  
  console.log('═'.repeat(80) + '\n');
  next();
};

module.exports = { AppError, errorHandler, notFound, sendError, sendResponse, requestLogger };
