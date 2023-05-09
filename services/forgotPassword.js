const User = require("../db/models/User");
const { v4: uuidv4 } = require('uuid');
const sendMailService = require("./sendemail");

async function forgotPassword(email) {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("User not found");
  }

  const token = uuidv4();
  
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  const templateName = "forgot-password";
  const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const context = {
    resetLink: url
  };

  await sendMailService.sendEmail(email, templateName, context);
  console.log('Forgot password email sent successfully.');

  return token;
}

module.exports = {
  forgotPassword,
};
