const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const env = require('../configuration/env');

require('dotenv').config()

exports.sendEmail = async (email, templateName) => {
    
    let transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  
    transporter.use('compile', hbs({
      viewEngine: 'express-handlebars',
      viewPath: './email_templates/'
    }))

    const msg = {
        from: '"Ant Colony - project pharaoh" <project.pharaoh@hotmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Test", // Subject line
        text: templateName // plain text body
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
}
