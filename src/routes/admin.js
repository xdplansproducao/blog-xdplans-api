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

router.post('/posts', authenticate, validateCreatePost, postController.createPost);
router.put('/posts/:id', authenticate, validateUpdatePost, postController.updatePost);
router.delete('/posts/:id', authenticate, postController.deletePost);

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

module.exports = router;
