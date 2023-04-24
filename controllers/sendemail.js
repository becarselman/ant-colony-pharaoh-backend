const sendMailService = require('../services/sendemail')
const errors = require("../configuration/errors")

exports.sendEmail = async (req, res) => {
    const { email } = req.body

    try {
        await sendMailService.sendEmail(email)
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).json({ error: errors.FAILED_TO_SEND_EMAIL });
    }
}