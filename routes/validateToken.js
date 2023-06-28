const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/validateToken');

router.post('/validate-token', tokenController.validateToken);

module.exports = router;
