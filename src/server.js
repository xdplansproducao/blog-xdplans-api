/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const app = require('./app');
const connectDB = require('./config/db');
const { validateEnv, PORT } = require('./config/env');

// Validar variáveis de ambiente
validateEnv();

// Conectar ao MongoDB
connectDB();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
