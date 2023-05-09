const User = require("../db/models/User");
const jwt = require('jsonwebtoken');
const sendMailService = require("./sendemail");

async function forgotPassword(email) {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("User not found");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
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
