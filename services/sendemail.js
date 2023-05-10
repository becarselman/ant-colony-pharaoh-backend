const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const env = require('../configuration/env');
const fs = require("fs");

exports.sendEmail = async (email, templateName, context) => {
    
    let transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  
    transporter.use(
      'compile',
      hbs({
          viewEngine: {
              extName: '.hbs',
              partialsDir: './email-templates/',
              layoutsDir: './email-templates/',
              defaultLayout: '',
          },
          viewPath: './email-templates/',
          extName: '.hbs',
      })
    );

    const templatePath = `./email-templates/${templateName}.hbs`
    const template = fs.readFileSync(templatePath, 'utf-8');
    const emailSubject = getSubject(template);

    const msg = {
        from: '"Ant Colony - project pharaoh" project.pharaoh@hotmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: emailSubject, // Subject line
        template: templateName, //template
        context: context
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);

    function getSubject(template){

      const findSubject = /<subject>(.*?)<\/subject>/i;
      const match = template.match(findSubject);

      if (match && match[1]){
        return match[1];
      } 
      else {
        return "Ant Colony"; //default subject
      }
    }
}
