const projectService = require('../services/projects');

module.exports = {
  async createProject(req, res, next) {
    try {
      const { name, description, duration, developers, projectType, hourlyRate, projectValue, endDate, salesChannel, isFinished, } = req.body;
      const project = await projectService.createProject(name, description, duration, developers, projectType, 
        hourlyRate, projectValue, endDate, salesChannel, isFinished,);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  },

  async getProject(req, res, next) {
    try {
      const { id } = req.params;
      const project = await projectService.getProject(id);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  },
};