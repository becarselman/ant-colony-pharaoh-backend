const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const env = require("../configuration/env");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../db/models/User");
const authService = require('./authService');

async function sendForgotPasswordEmail(email, templateName) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const payload = { email };
  const token = await authService.generateToken(payload);
  const resetUrl = `http://localhost:3001/resetpassword/${token}`;

  const message = {
    from: "noreply@example.com",
    to: email,
    subject: "Reset password",
    html: `<p>You have requested to reset your password. Click the link below to reset it:</p><br><a href="${resetUrl}">${resetUrl}</a>`,
  };

  try {
    await sendEmail(message);
    return { success: true, message: "Email sent." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Email not sent." };
  }
}

async function sendActivationEmail(email, templateName) {
  const payload = { email };
  const token = await authService.generateToken(payload);
  const activationUrl = `http://localhost:3001/activate/${token}`;

  const message = {
    from: "noreply@example.com",
    to: email,
    subject: "Activate account",
    template: templateName,
    context: {
      activationUrl,
    },
  };

  try {
    await sendEmail(message);
    return { success: true, message: "Email sent." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Email not sent." };
  }
}


module.exports = {
sendForgotPasswordEmail,
sendActivationEmail,
};