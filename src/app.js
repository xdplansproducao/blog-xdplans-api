/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const { CORS_ORIGIN, NODE_ENV } = require('./config/env');

const app = express();

// Security headers
app.use(helmet());

// CORS
const corsOptions = {
  origin: NODE_ENV === 'production' && CORS_ORIGIN !== '*' 
    ? CORS_ORIGIN.split(',') 
    : '*',
  credentials: true,
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/public'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/client', require('./routes/client'));

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
