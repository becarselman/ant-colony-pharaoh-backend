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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const searchQuery = req.query.search || null;
      const projectStatus = req.query.projectStatus || null;

      const result = await projectService.getPaginatedProjects(page, limit, searchQuery, projectStatus);
      const { projects, count } = result;
      res.status(200).json({ projects, count });
    } catch (error) {
      next(error);
    }
  },

  async updateProject(req, res, next) {
    try {
      const project = await projectService.updateProject(req.params.id, req.body)
      return res.status(200).json(project)
    }
    catch (error) {
      next(error)
    }
  },

  async deleteProject(req, res, next) {
    try {
      await projectService.deleteProject(req.params.id)
      return res.status(200).json({ message: "Project deleted successfully" })
    }
    catch (error) {
      next(error)
    }
  }
};
