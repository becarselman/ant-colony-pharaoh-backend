const projectRepository = require('../repositories/projects');

module.exports = {
  async createProject(req, res, next) {
    try {
      const project = await projectRepository.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  },

  async getProject(req, res, next) {
    try {
      const { id } = req.params;
      const project = await projectRepository.getProjectById(id);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  },
};
