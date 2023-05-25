const Project = require('../db/models/projects');

async function createProject(projectData) {
  const project = await Project.create(projectData);
  return project;
}

async function getProjectById(projectId) {
  const project = await Project.findById(projectId);
  return project;
}

async function getPaginatedProjects(page, limit) {
  const offset = (page - 1) * limit;
  const projects = await Project.find()
    .skip(offset)
    .limit(limit);
  return projects;
}

async function getProjectsCount() {
  const count = await Project.countDocuments();
  return count;
}

module.exports = {
  createProject,
  getProjectById,
  getPaginatedProjects,
  getProjectsCount,
};
