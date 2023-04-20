const sendMailService = require('../services/sendemail')

exports.sendEmail = async (req, res) => {
    const { email } = req.body

    try {
        await sendMailService.sendEmail(email)
        res.json({message: 'Email Sent!', status: 'OK'})
    } catch (error) {
        res.status(500).send('Failed to send email')
    }
}