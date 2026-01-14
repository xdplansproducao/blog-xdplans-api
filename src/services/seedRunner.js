/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 * 
 * Script standalone para executar seed via CLI
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { seedBlog } = require('./seed');
const { MONGODB_URI } = require('../config/env');

const runSeed = async () => {
  try {
    console.log('🔌 Conectando ao MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await seedBlog();

    console.log('✅ Seed concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
    process.exit(1);
  }
};

runSeed();
