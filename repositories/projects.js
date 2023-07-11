const Project = require('../db/models/projects');

async function createProject(projectData) {
  const project = await Project.create(projectData);
  return project;
}

async function getProjectById(projectId) {
  if (projectId === "all") {
    const projects = await Project.find();
    return projects;
  }
  const project = await Project.findById(projectId);
  return project;
}

async function getPaginatedProjects(page, limit, searchQuery, projectStatus) {
  const offset = (page - 1) * limit;
  let query = {};

  if (searchQuery) {
    query = buildSearchQuery(searchQuery);
  }

  if (projectStatus) {
    query.projectStatus = projectStatus;
  }

  const projects = await Project.find(query)
    .populate('developers.employee') 
    .skip(offset)
    .limit(limit);

  return projects;
}

async function getProjectsCount(searchQuery, projectStatus) {
  let query = {};

  if (searchQuery) {
    query = buildSearchQuery(searchQuery);
  }

  if (projectStatus) {
    query.projectStatus = projectStatus;
  }

  const count = await Project.countDocuments(query);
  return count;
}

async function updateProject(projectId, projectData) {
  return await Project.findByIdAndUpdate(projectId, projectData, { new: true }).exec()
}

async function deleteProject(projectId) {
  return await Project.findByIdAndDelete(projectId).exec()
}

function buildSearchQuery(searchQuery) {
  const query = {};

  for (const key in searchQuery) {
    if (searchQuery.hasOwnProperty(key)) {
      query[key] = { $regex: searchQuery[key], $options: 'i' };
    }
  }

  return query;
}

module.exports = {
  createProject,
  getProjectById,
  getPaginatedProjects,
  getProjectsCount,
  updateProject,
  deleteProject
};
