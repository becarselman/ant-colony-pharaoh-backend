const nodemailer = require("nodemailer");

exports.sendEmail = async (email) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'creola.cassin13@ethereal.email', // ethereal user
            pass: '	g2rTx87ZwSgcGukqrZ', // ethereal password
        },
    });
    
    const msg = {
        from: '"The Exapress App" <theExpressApp@example.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Test", // Subject line
        text: "Tekst maila", // plain text body
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
