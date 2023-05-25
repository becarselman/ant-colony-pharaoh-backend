const projectService = require("../services/projects");

module.exports = {
  async createProject(req, res, next) {
    try {
      const project = await projectService.createProject(req.body);
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

  async getPaginatedProjects(req, res, next) {
    try {
      const { skip, limit } = req.query;
      const projects = await projectService.getPaginatedProjects(skip, limit);
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  },  

};
