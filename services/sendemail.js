const User = require('../models/user');
const crypto = require('crypto');

exports.sendEmail = async (email, templateName) => {
  let transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

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

  const templatePath = `./email-templates/${templateName}.hbs`;
  const template = fs.readFileSync(templatePath, 'utf-8');
  const emailSubject = getSubject(template);

  // generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // token is valid for 24 hours

  // save resetToken and resetTokenExpirationDate to database
  const user = await User.findOneAndUpdate({ email: email }, { resetToken: resetToken, resetTokenExpirationDate: resetTokenExpirationDate });

  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }

  const msg = {
    from: '"Ant Colony - project pharaoh" project.pharaoh@hotmail.com', // sender address
    to: `${email}`, // list of receivers
    subject: emailSubject, // Subject line
    template: templateName, //template
    context: {
      resetLink: `https://example.com/reset-password?token=${resetToken}&email=${email}`,
    },
  };
  // send mail with defined transport object
  const info = await transporter.sendMail(msg);

  console.log('Message sent: %s', info.messageId);

  function getSubject(template) {
    const findSubject = /<subject>(.*?)<\/subject>/i;
    const match = template.match(findSubject);

    if (match && match[1]) {
      return match[1];
    } else {
      return 'Ant Colony'; //default subject
    }
  }
};