/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');

router.get('/health', (req, res) => {
  res.json({
    success: true,
    name: 'XD Plans Blog API',
    developer: 'David Xavier',
    company: 'XD Plans',
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

router.get('/posts', postController.getPosts);
router.get('/posts/:slug', postController.getPostBySlug);
router.get('/categories', categoryController.getCategories);

module.exports = router;
