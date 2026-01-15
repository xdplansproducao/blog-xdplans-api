/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { ensureTmpDir } = require('../services/cloudinaryService');

// Garante que o diretório tmp exista
ensureTmpDir();

// Configuração do storage do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tmpDir = path.join(process.cwd(), 'tmp');
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    // Gera nome de arquivo seguro: timestamp + random + extensão normalizada
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${timestamp}_${random}${ext}`;
    cb(null, filename);
  },
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Apenas JPG, JPEG, PNG e WEBP são aceitos.'), false);
  }
};

// Configuração do multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1, // Apenas um arquivo por vez
  },
});

// Middleware para upload de uma única imagem de capa
const uploadSingleCover = upload.single('image');

// Middleware de tratamento de erros do multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Arquivo muito grande. Tamanho máximo permitido: 5MB',
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Apenas um arquivo é permitido por requisição',
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Campo de arquivo não esperado. Use "image" como nome do campo',
      });
    }
  }

  if (error.message.includes('Tipo de arquivo não permitido')) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next(error);
};

module.exports = {
  uploadSingleCover,
  handleMulterError,
};
