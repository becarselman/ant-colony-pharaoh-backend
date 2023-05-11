const jwt = require("jsonwebtoken");
const User = require("../db/models/User");
const sendMailService = require("./sendemail");
const userRepository = require("../repositories/user");
const env = require("../configuration/env")
const { generateToken } = require("./helper");

async function setResetPasswordToken(user) {
  const token = generateToken({ userId: user._id }, "1h");
  return token;
}

async function forgotPassword(email) {
  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new Error(errors.EMAIL_NOT_FOUND);
  }

  const token = await setResetPasswordToken(user);

  const templateName = "forgot-password";
  const resetPasswordUrl = env.FRONTEND_URL;
  const url = `${resetPasswordUrl}/reset-password/${token}`;
  const context = {
    resetLink: url
  };

  await sendMailService.sendEmail(email, templateName, context);

  return token;
}

module.exports = {
  forgotPassword,
};
