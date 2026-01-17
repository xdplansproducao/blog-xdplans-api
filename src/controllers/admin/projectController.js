const Project = require('../../models/Project');
const { adminProjectUpdateSchema } = require('../../validators/admin');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');

exports.listProjects = async (req, res) => {
  try {
    const { clientId, page = 1, limit = 20 } = req.query;
    const filter = clientId ? { clientId } : {};
    const projects = await Project.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    return sendResponse(res, projects, 'Lista de projetos');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

exports.updateProject = async (req, res) => {
  try {
    const data = adminProjectUpdateSchema.parse(req.body);
    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!project) return sendError(res, 404, 'Projeto não encontrado');
    return sendResponse(res, project, 'Projeto atualizado');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
