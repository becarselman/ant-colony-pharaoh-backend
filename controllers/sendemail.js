const sendMailService = require('../services/sendemail')
const errors = require("../configuration/errors")
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

exports.sendEmail = async (req, res) => {
    const { email, templateName } = req.body

    try {
        await sendMailService.sendEmail(email, templateName, context)
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        res.status(500).send({ error: errors.FAILED_TO_SEND_EMAIL})
    }
}