import nodemailer from 'nodemailer';
import ejs from 'ejs';


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === 'yes',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }

      // console.log('Message sent: %s', info.messageId);
      // // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      resolve(info)
    });
  })
}


export const composeMail = ({ subject, template, destination, data }) => {
  // const { subject, template, destination, data } = config;
  ejs.renderFile(template, data, (err, html) => {
    if (err) {
      console.log(err);
      return;
    }

    const mailOptions = {
      from: process.env.MAIL_FROM_NAME + '<' + process.env.MAIL_FROM_ADDRESS + '>',
      to: destination, // list of email split by ','
      subject: subject,
      html: html
    };
    sendMail(mailOptions)
  })
}

export default transporter;
