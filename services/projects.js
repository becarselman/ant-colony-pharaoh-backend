const projectRepository = require('../repositories/projects');
const errors = require("../configuration/errors");

module.exports = {
  async createProject(data) {
    const project = await projectRepository.createProject(data);
    return project;
  },

  async getProject(id) {
    const project = await projectRepository.getProjectById(id);
    if (!project) {
      throw new Error(errors.DATA_NOT_FOUND);
    }
    return project;
  },

  async getAllProjects() {
    const projects = await projectRepository.getAllProjects();
    return projects;
  },
};