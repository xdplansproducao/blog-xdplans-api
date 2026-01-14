/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const Post = require('../models/Post');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Post.distinct('category', {
      status: 'published',
    });

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Post.countDocuments({
          category,
          status: 'published',
        });
        return { name: category, count };
      })
    );

    res.json({
      success: true,
      data: categoriesWithCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories };
