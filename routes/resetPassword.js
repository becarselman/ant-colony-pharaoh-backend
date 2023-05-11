const express = require('express')
const router = express.Router()
const resetPasswordController = require('../controllers/resetPassword')

router.post('/:token', resetPasswordController.resetPassword)

module.exports = router
