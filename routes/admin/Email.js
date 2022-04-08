const nodemailer = require("nodemailer");
const sendEmail = async (email, subject, text) => {
  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.email,
        pass: process.env.emailPass,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "abdelrahman22.mostafa@outlook.com", // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    });

    return `Message sent: ${info.messageId}`;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${error.message}`
    );
  }
};

module.exports = sendEmail;

// const sendExamIdEmail = async (name, email) => {
//   let transporter = nodemailer.createTransport({
//     sendmail: true,
//     newline: "windows",
//     logger: false,
//   });

//   let message = {
//     from: "Andris <andris@kreata.ee>",
//     to: name,
//     bcc: email,

//     // Subject of the message
//     subject: "Nodemailer is unicode friendly ✔",

//     // plaintext body
//     text: "Hello to myself!",
//   };

//   let info = await transporter.sendMail(message, function (error, info) {
//     if (error) {
//       return error;
//     } else {
//       return "sent";
//     }
//   });
//   return info;
// };

// module.exports = sendExamIdEmail;
// // 123456789AbdoMos
