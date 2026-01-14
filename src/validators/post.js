/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const { z } = require('zod');

const createPostSchema = z.object({
  title: z.string().min(3).max(200),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(50),
  category: z.string().min(2).max(50),
  tags: z.array(z.string()).optional().default([]),
  coverImage: z.string().optional().default(''),
  status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
  publishedAt: z.string().datetime().optional(),
});

const updatePostSchema = createPostSchema.partial();

const validatePost = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.errors,
      });
    }
  };
};

module.exports = {
  validateCreatePost: validatePost(createPostSchema),
  validateUpdatePost: validatePost(updatePostSchema),
};
