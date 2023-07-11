const projectRepository = require('../repositories/projects');
const employeeService = require('../services/employee');
const errors = require("../configuration/errors");

module.exports = {
  async createProject(data) {
    const { developers, ...projectData } = data;
    const projectDevelopers = [];

    for (const developer of developers) {
      const employee = await employeeService.getEmployeeById(developer.employee);
      if (!employee) {
        throw new Error(errors.DATA_NOT_FOUND);
      }
      projectDevelopers.push({
        employee: employee._id,
        fullTime: developer.fullTime
      });
    }

    projectData.developers = projectDevelopers;
    const project = await projectRepository.createProject(projectData);
    return project;
  },

  async getProject(id) {
    const project = await projectRepository.getProjectById(id);
    if (!project) {
      throw new Error(errors.DATA_NOT_FOUND);
    }
    return project;
  },

  async getPaginatedProjects(page, limit, searchQuery, projectStatus) {
    const projects = await projectRepository.getPaginatedProjects(page, limit, searchQuery, projectStatus);
    const count = await projectRepository.getProjectsCount(searchQuery, projectStatus);
    return { projects, count };
  },

  async updateProject(projectId, projectData) {
    let project
    try {
      project = await projectRepository.updateProject(projectId, projectData)
    }
    catch(error) {
      throw new Error(errors.FAILED_TO_UPDATE_PROJECT)
    }

    if (!project) {
      throw new Error(errors.PROJECT_NOT_FOUND)
    }

    return project
  },

  async deleteProject(projectId, projectData) {
    let project
    try {
      project = await projectRepository.deleteProject(projectId)
    }
    catch(error) {
      throw new Error(errors.FAILED_TO_DELETE_PROJECT)
    }

    if (!project) {
      throw new Error(errors.PROJECT_NOT_FOUND)
    }

    return project
  }
};