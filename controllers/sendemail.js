const sendMailService = require('../services/sendemail')
const errors = require("../configuration/errors")

exports.sendEmail = async (req, res) => {
    const { email, templateName } = req.body

    try {
        await sendMailService.sendEmail(email, templateName)
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send({ error: errors.FAILED_TO_SEND_EMAIL})
    }
}