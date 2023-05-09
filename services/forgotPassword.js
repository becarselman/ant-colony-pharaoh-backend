const User = require("../db/models/User");
const sendMailService = require("./sendemail");
const userRepository = require("../repositories/user");

async function forgotPassword(email) {
  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const token = await userRepository.setResetPasswordToken(user);

  const templateName = "forgot-password";
  const resetPasswordUrl = process.env.RESET_PASSWORD_URL;
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
