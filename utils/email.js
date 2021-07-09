const nodemailer = require('nodemailer');

const sendEmail = async options => {
    //create transport function
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e04fff51e4195b",
          pass: "9fe450df8fe723"
        }
    });

    const mailOptions = {
        from : 'LinX admin <linx@gmail.com>',
        to : options.email,
        subject : options.subject,
        text : options.text
    }

    await transporter.sendMail(mailOptions);

}

module.exports = sendEmail;