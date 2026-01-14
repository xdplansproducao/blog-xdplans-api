/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

require('dotenv').config();

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error(`❌ Variáveis de ambiente faltando: ${missing.join(', ')}`);
    process.exit(1);
  }
};

module.exports = {
  validateEnv,
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || 'development',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@xdplans.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};
