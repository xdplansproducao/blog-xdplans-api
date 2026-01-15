/**
 * XD Plans - Blog API (Headless)
 * 
 * Desenvolvedor: David Xavier
 * Projeto: XD Plans (Sites, Lojas Virtuais e Apps)
 * Ano: 2026
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configuração do Cloudinary com variáveis de ambiente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Faz upload de imagem para o Cloudinary
 * @param {string} localFilePath - Caminho do arquivo local
 * @param {object} options - Opções de upload
 * @returns {Promise<object>} - Dados da imagem enviada
 */
const uploadImage = async (localFilePath, options = {}) => {
  try {
    const defaultOptions = {
      folder: 'blog/covers',
      resource_type: 'image',
      secure: true,
      ...options,
    };

    const result = await cloudinary.uploader.upload(localFilePath, defaultOptions);

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Erro ao fazer upload para Cloudinary:', error);
    throw new Error('Falha no upload da imagem');
  }
};

/**
 * Remove imagem do Cloudinary
 * @param {string} publicId - ID público da imagem
 * @returns {Promise<boolean>} - Sucesso da operação
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Erro ao remover imagem do Cloudinary:', error);
    throw new Error('Falha ao remover imagem');
  }
};

/**
 * Remove arquivo local temporário
 * @param {string} filePath - Caminho do arquivo
 */
const cleanupLocalFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Arquivo temporário removido: ${filePath}`);
    }
  } catch (error) {
    console.error('Erro ao remover arquivo temporário:', error);
  }
};

/**
 * Garante que o diretório tmp exista
 */
const ensureTmpDir = () => {
  const tmpDir = path.join(process.cwd(), 'tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
    console.log('Diretório tmp criado:', tmpDir);
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  cleanupLocalFile,
  ensureTmpDir,
};
