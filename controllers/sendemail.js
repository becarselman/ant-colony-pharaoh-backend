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

exports.sendForgotPasswordEmail = async (req, res, next) => {
  const { email } = req.body;
  const result = await sendEmailService.sendForgotPasswordEmail(email);
  res.json(result);
};

exports.sendActivationEmail = async (req, res, next) => {
  const { email, templateName } = req.body;
  const result = await sendActivationEmail(email, templateName);
  res.json(result);
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const secret = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ email: decoded.email }); 
    if (!user) {
      throw new Error(errors.USER_NOT_FOUND);
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(400).send({ error: errors.INVALID_RESET_TOKEN });
  }
};
