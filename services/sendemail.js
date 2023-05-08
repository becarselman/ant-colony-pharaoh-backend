const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const env = require("../configuration/env");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../db/models/User");

function generateToken() {
  return new Promise((resolve, reject) => {
    jwt.sign({ data: "reset_password" }, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      partialsDir: "./email-templates/",
      layoutsDir: "./email-templates/",
      defaultLayout: "",
    },
    viewPath: "./email-templates/",
    extName: ".hbs",
  })
);

function getSubject(template) {
  const findSubject = /<subject>(.*?)<\/subject>/i;
  const match = template.match(findSubject);

  if (match && match[1]) {
    return match[1];
  } else {
    return "Ant Colony"; //default subject
  }
}

async function sendEmail(message) {
  return transporter.sendMail(message);
}

async function sendForgotPasswordEmail(email, templateName) {
  const token = await generateToken();
  const resetUrl = `http://localhost:3000/resetpassword/${token}`;

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
  const token = await generateToken();
  const activationUrl = `http://localhost:3000/activate/${token}`;

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

async function sendWelcomeEmail(userEmail) {
  const message = {
    from: "noreply@example.com",
    to: userEmail,
    subject: "Welcome to Ant Colony!",
    template: "welcome",
  };

  try {
    await sendEmail(message);
    return { success: true, message: "Email sent." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Email not sent." };
  }
}

async function sendEmailVerificationEmail(userEmail) {
  const token = await generateToken();
  const verificationUrl = "http://localhost:3000/verifyemail/${token}";

  const message = {
    from: "noreply@example.com",
    to: userEmail,
    subject: "Verify your email address",
    template: "email_verification",
    context: {
      verificationUrl,
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
  sendWelcomeEmail,
  sendEmailVerificationEmail,
};