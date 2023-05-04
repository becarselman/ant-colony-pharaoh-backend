const express = require('express')
const router = express.Router()
const sendMailController = require('../controllers/sendemail')
const forgotPasswordController = require('../controllers/forgotpassword')
const resetPasswordController = require('../controllers/resetpassword')

router.post('/', sendMailController.sendEmail);
router.post('/forgot-password', forgotPasswordController.forgotPassword);
router.patch('/resetpassword/:resetToken', resetPasswordController.resetPassword);

module.exports = router;