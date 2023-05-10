const jwt = require("jsonwebtoken");
const User = require("../db/models/User");
const sendMailService = require("./sendemail");
const userRepository = require("../repositories/user");
const env = require("../configuration/env")

async function setResetPasswordToken(user) {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

async function forgotPassword(email) {
  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const token = await setResetPasswordToken(user);

  const templateName = "forgot-password";
  const resetPasswordUrl = env.RESET_PASSWORD_URL;
  const url = `${resetPasswordUrl}${token}`;
  const context = {
    resetLink: url
  };

  await sendMailService.sendEmail(email, templateName, context);

  return token;
}

module.exports = {
  forgotPassword,
};
