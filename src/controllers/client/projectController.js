const Project = require('../../models/Project');
const { sendError, sendResponse } = require('../../middlewares/errorHandler');

exports.getActiveProject = async (req, res) => {
  try {
    const project = await Project.findOne({ clientId: req.user.id, status: 'active' });
    return sendResponse(res, project || null, 'Projeto ativo do cliente');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
