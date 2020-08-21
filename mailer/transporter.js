const nodemailer = require('nodemailer');
const fs = require('fs');
const emailPass = process.env.PORT ? process.env.EMAIL_PASS : fs.readFileSync('./private/email_pass.txt').toString();


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587, 
  auth: { 
    user: 'fatcattitude',
    pass: emailPass,
  }
});

module.exports = transporter;