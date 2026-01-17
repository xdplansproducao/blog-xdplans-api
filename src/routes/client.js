const express = require('express');
const router = express.Router();
const authClient = require('../middlewares/authClient');
const authController = require('../controllers/client/authController');
const meController = require('../controllers/client/meController');
const quoteController = require('../controllers/client/quoteController');
const projectController = require('../controllers/client/projectController');
const ticketController = require('../controllers/client/ticketController');

// Auth
router.post('/auth/login', authController.login);
router.post('/auth/change-password', authClient, authController.changePassword);

// Me
router.get('/me', authClient, meController.getMe);
router.patch('/me', authClient, meController.updateMe);

// Quotes
router.get('/quotes', authClient, quoteController.listQuotes);
router.get('/quotes/:id', authClient, quoteController.getQuote);

// Projects
router.get('/projects/active', authClient, projectController.getActiveProject);

// Tickets
router.post('/tickets', authClient, ticketController.createTicket);
router.get('/tickets', authClient, ticketController.listTickets);
router.get('/tickets/:id', authClient, ticketController.getTicket);
router.post('/tickets/:id/messages', authClient, ticketController.addMessage);
router.patch('/tickets/:id/close', authClient, ticketController.closeTicket);

module.exports = router;
