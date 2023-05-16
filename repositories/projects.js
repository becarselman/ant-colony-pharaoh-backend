const Project = require('../db/models/projects');

async function createProject(projectData) {
  const project = new Project(projectData);
  await project.save();
  return project;
}

async function getProjectById(projectId) {
  const project = await Project.findById(projectId);
  return project;
}

module.exports = {
  createProject,
  getProjectById,
};
