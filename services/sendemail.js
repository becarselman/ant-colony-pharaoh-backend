const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const env = require('../configuration/env');
const fs = require("fs");
const jwt = require('jsonwebtoken');

function generateToken() {
  return new Promise((resolve, reject) => {
    jwt.sign({ data: 'reset_password' }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

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

  const sendForgotPasswordEmail = async (email) => {
    const token = await generateToken() // funkcija koja generiše token za resetovanje lozinke
    const resetUrl = `http://localhost:3000/resetpassword/${token}` // url adresa za resetovanje lozinke
  
    const message = {
      from: 'noreply@antcolony.com',
      to: email,
      subject: 'Zaboravljena lozinka',
      html: `<p>Poslali ste zahtjev za resetovanje lozinke na vašem računu. Kliknite na link ispod kako biste resetovali lozinku:</p><br><a href="${resetUrl}">${resetUrl}</a>`
    }
  
    try {
      await sendEmail(message) // funkcija za slanje emaila
      return { success: true, message: 'Email je poslan' }
    } catch (error) {
      return { success: false, message: 'Došlo je do greške prilikom slanja emaila' }
    }
  }
  
  const resetPassword = async (token, password) => {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
  
    if (!user) {
      return { success: false, message: 'Token za resetovanje lozinke je nevažeći ili je istekao' }
    }
  
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
  
    await user.save()
    return { success: true, message: 'Lozinka je uspješno resetovana' }
  }
  
  module.exports = { sendForgotPasswordEmail, resetPassword }
  

  const templatePath = `./email-templates/${templateName}.hbs`
  const template = fs.readFileSync(templatePath, 'utf-8');
  const emailSubject = getSubject(template);

    const msg = {
        from: '"Ant Colony - project pharaoh" project.pharaoh@hotmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: emailSubject, // Subject line
        template: templateName //template
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
