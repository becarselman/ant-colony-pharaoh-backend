const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');

router.post('/', projectController.createProject);
router.get('/:id', projectController.getProject);

module.exports = router;