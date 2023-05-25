const express = require('express')
const usersController = require("../controllers/users")

var router = express.Router();

router.get('/', usersController.getAllUsers)

module.exports = router;