const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');
const { validateProjectData } = require("../middleware/projects")

router.post('/', validateProjectData, projectController.createProject);
router.get('/', projectController.getPaginatedProjects);
router.get('/:id', projectController.getProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
