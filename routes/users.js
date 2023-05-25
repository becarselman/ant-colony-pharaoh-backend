const express = require('express')
const usersController = require("../controllers/users")
const usersMiddleware = require("../middleware/users")

var router = express.Router();

router.get('/', usersMiddleware.validatePageAndPageSize, usersController.getAllUsers)
router.get('/:id', usersMiddleware.validateId, usersController.getUserById)
router.delete('/:id', usersMiddleware.validateId, usersController.deleteUserById)
router.patch('/:id', usersMiddleware.validateId, usersMiddleware.validateUpdateUserData, usersController.updateUserById)

module.exports = router;