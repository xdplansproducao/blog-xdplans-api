/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const postController = require('../controllers/postController');
const { validateCreatePost, validateUpdatePost } = require('../validators/post');
const { seedBlog } = require('../services/seed');
const { uploadSingleCover, handleMulterError } = require('../middlewares/upload');

router.post('/posts', authenticate, validateCreatePost, postController.createPost);
router.put('/posts/:id', authenticate, validateUpdatePost, postController.updatePost);
router.delete('/posts/:id', authenticate, postController.deletePost);

// Upload de imagem de capa para posts
router.post('/uploads/blog/cover', 
  authenticate, 
  uploadSingleCover, 
  handleMulterError, 
  postController.uploadPostCover
);

router.post('/seed', authenticate, async (req, res, next) => {
  try {
    await seedBlog();
    res.json({
      success: true,
      message: 'Seed executado com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

// Portal do Cliente - Admin
const clientController = require('../controllers/admin/clientController');
const quoteController = require('../controllers/admin/quoteController');
const projectController = require('../controllers/admin/projectController');
const ticketController = require('../controllers/admin/ticketController');

// Clients
router.post('/clients', authenticate, clientController.createClient);
router.get('/clients', authenticate, clientController.listClients);
router.get('/clients/:id', authenticate, clientController.getClient);
router.patch('/clients/:id', authenticate, clientController.updateClient);

// Quotes
router.post('/quotes', authenticate, quoteController.createQuote);
router.patch('/quotes/:id/status', authenticate, quoteController.updateQuoteStatus);
router.get('/quotes', authenticate, quoteController.listQuotes);

// Projects
router.get('/projects', authenticate, projectController.listProjects);
router.patch('/projects/:id', authenticate, projectController.updateProject);

// Tickets
router.get('/tickets', authenticate, ticketController.listTickets);
router.patch('/tickets/:id/status', authenticate, ticketController.updateTicketStatus);
router.post('/tickets/:id/messages', authenticate, ticketController.addMessage);

module.exports = router;
