const sendEmailService = require("../services/sendemail");
const errors = require("../configuration/errors");
const jwt = require("jsonwebtoken");
const User = require("../db/models/User");

exports.sendEmail = async (req, res) => {
  const { email, templateName } = req.body;

  try {
    await sendEmailService.sendEmail(email, templateName);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    res.status(500).send({ error: errors.FAILED_TO_SEND_EMAIL });
  }
};

exports.sendForgotPasswordEmail = async (req, res) => {
  const { email, templateName } = req.body;
  const secret = process.env.JWT_SECRET; 

  try {
    const payload = { email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" }); 
    const resetUrl = 'http://localhost:3000/resetpassword/${token}'; 
    await sendEmailService.sendForgotPasswordEmail(email, templateName, resetUrl);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    res.status(500).send({ error: errors.FAILED_TO_SEND_EMAIL });
  }
};

exports.getResetPassword = async (req, res) => {
  const { token } = req.params;
  const secret = process.env.JWT_SECRET; 

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ email: decoded.email }); 
    if (!user) {
      throw new Error(errors.USER_NOT_FOUND);
    }
    res.status(200).json({ message: "Reset password page." });
  } catch (error) {
    res.status(400).send({ error: errors.INVALID_RESET_TOKEN });
  }
};