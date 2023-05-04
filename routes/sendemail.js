const express = require('express')
const sendMailController = require('../controllers/sendemail')

const router = express.Router()

router.post('/', sendMailController.sendEmail)
router.post('/forgotpassword', sendMailController.sendForgotPasswordEmail);
router.post('/resetpassword', sendMailController.resetPassword);


module.exports = router
