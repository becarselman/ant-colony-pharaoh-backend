const sendEmailService = require('../services/sendemail')
const errors = require('../configuration/errors')
const jwt = require('jsonwebtoken')


exports.sendEmail = async (req, res) => {
  const { email, templateName } = req.body

  try {
    await sendEmailService.sendEmail(email, templateName)
    res.status(200).json({ message: 'Email sent successfully.' })
  } catch (error) {
    res.status(500).send({ error: errors.FAILED_TO_SEND_EMAIL })
  }
}

exports.sendForgotPasswordEmail = async (req, res) => {
  const { email, templateName } = req.body
  const secret = process.env.JWT_SECRET // Ovdje koristimo varijablu okruženja za tajni ključ

  try {
    const payload = { email }
    const token = generateToken(payload, secret, '1h') // Token važi jedan sat
    const resetUrl = `https://www.example.com/reset-password?token=${token}` // Ovdje možete koristiti vašu vlastitu URL putanju
    await sendEmailService.sendForgotPasswordEmail(email, templateName, resetUrl)
    res.status(200).json({ message: 'Email sent successfully.' })
  } catch (error) {
    res.status(500).send({ error: errors.FAILED_TO_SEND_EMAIL })
  }
}

const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (err) {
    return false
  }
}

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body
  const secret = process.env.JWT_SECRET // Ovdje koristimo varijablu okruženja za tajni ključ

  const decoded = verifyToken(token, secret)

  if (!decoded) {
    return res.status(400).send({ error: errors.INVALID_RESET_TOKEN })
  }

  try {
    const result = await sendEmailService.resetPassword(decoded.email, password)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).send({ error: errors.FAILED_TO_RESET_PASSWORD })
  }
}
