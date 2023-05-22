const Project = require('../db/models/projects');

async function createProject(projectData) {
  const project = await Project.create(projectData);
  return project;
}

async function getProjectById(projectId) {
  const project = await Project.findById(projectId);
  return project;
}

async function getAllProjects() {
  const projects = await Project.find();
  return projects;
}

module.exports = {
  createProject,
  getProjectById,
  getAllProjects,
};