const projectService = require("../services/projects");
const employeeService = require("../services/employee");

module.exports = {
  async createProject(req, res, next) {
    try {
      const { developers, ...projectData } = req.body;
      const projectDevelopers = [];

      for (const developer of developers) {
        const employee = await employeeService.getEmployeeById(developer.employee);
        if (!employee) {
          return res.status(400).json({ error: 'Employee not found.' });
        }
        projectDevelopers.push({
          employee: employee._id, 
          fullTime: developer.fullTime
        });
      }

      projectData.developers = projectDevelopers;
      const project = await projectService.createProject(projectData);
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
};
