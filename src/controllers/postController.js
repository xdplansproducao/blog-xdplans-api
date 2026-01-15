/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const Post = require('../models/Post');
const { generateSlug } = require('../utils/slug');
const { AppError } = require('../middlewares/errorHandler');
const { uploadImage, cleanupLocalFile } = require('../services/cloudinaryService');

const getPosts = async (req, res, next) => {
  try {
    const {
      q,
      category,
      tag,
      page = 1,
      limit = 10,
      sort = '-publishedAt',
      status,
    } = req.query;

    const query = {};

    // Por padrão, retorna apenas posts publicados
    if (!status) {
      query.status = 'published';
    } else {
      query.status = status;
    }

    // Busca por texto
    if (q) {
      query.$text = { $search: q };
    }

    // Filtro por categoria
    if (category) {
      query.category = category;
    }

    // Filtro por tag
    if (tag) {
      query.tags = tag;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const posts = await Post.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content')
      .lean();

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug, status: 'published' });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado',
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, excerpt, content, category, tags, coverImage, status, publishedAt } = req.body;

    const slug = generateSlug(title);

    // Verificar se slug já existe
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({
        success: false,
        message: 'Já existe um post com este título',
      });
    }

    const postData = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags || [],
      coverImage: coverImage || '',
      status: status || 'draft',
    };

    if (publishedAt) {
      postData.publishedAt = new Date(publishedAt);
    } else if (status === 'published') {
      postData.publishedAt = new Date();
    }

    const post = await Post.create(postData);

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Slug já existe',
      });
    }
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Se título mudou, gerar novo slug
    if (updateData.title) {
      updateData.slug = generateSlug(updateData.title);
    }

    // Se status mudou para published e não tem publishedAt, definir agora
    if (updateData.status === 'published' && !updateData.publishedAt) {
      const existingPost = await Post.findById(id);
      if (!existingPost.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    if (updateData.publishedAt) {
      updateData.publishedAt = new Date(updateData.publishedAt);
    }

    const post = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado',
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Slug já existe',
      });
    }
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndUpdate(
      id,
      { status: 'archived' },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado',
      });
    }

    res.json({
      success: true,
      message: 'Post arquivado com sucesso',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const uploadPostCover = async (req, res, next) => {
  try {
    // Verifica se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma imagem enviada',
      });
    }

    // Faz upload para o Cloudinary
    const imageData = await uploadImage(req.file.path, {
      folder: 'blog/covers',
    });

    // Remove arquivo temporário
    cleanupLocalFile(req.file.path);

    res.status(201).json({
      success: true,
      data: imageData,
      message: 'Upload realizado com sucesso',
    });
  } catch (error) {
    // Remove arquivo temporário em caso de erro
    if (req.file && req.file.path) {
      cleanupLocalFile(req.file.path);
    }

    console.error('Erro no upload de imagem:', error);
    
    if (error.message.includes('Falha no upload da imagem')) {
      return res.status(502).json({
        success: false,
        message: 'Erro no serviço de upload. Tente novamente.',
      });
    }

    next(error);
  }
};

module.exports = {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  uploadPostCover,
};
