const express = require('express')
const sendMailController = require('../controllers/sendemail')

const router = express.Router()

router.post('/', sendMailController.sendEmail)

module.exports = router
