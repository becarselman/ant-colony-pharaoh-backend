const sendMailService = require('../services/sendemail')

exports.sendEmail = async (req, res) => {
    const { email } = req.body

    try {
        await sendMailService.sendEmail(email)
        res.send('Email Sent!')
    } catch (error) {
        console.error(error)
        res.status(500).send('Failed to send email')
    }
}