const Project = require('../db/models/projects');
const errors = require("../configuration/errors");


module.exports = {
  async createProject(name, description, duration, developers, projectType, hourlyRate, projectValue, endDate, salesChannel, isFinished,) {
    const project = new Project({
      name,
      description,
      duration,
      developers,
      projectType,
      hourlyRate,
      projectValue,
      endDate,
      salesChannel,
      isFinished
  
    });
    await project.validate();
    await project.save();
    return project;
  },

  async getProject(id) {
    const project = await Project.findById(id);
    if (!project) {
      throw new Error(errors.PROJECT_NOT_FOUND);
    }
    return project;
  },
};