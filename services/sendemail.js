const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

require('dotenv').config()

exports.sendEmail = async (email, templateName) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
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
        template: templateName
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}
