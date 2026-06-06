import nodemailer from 'nodemailer';



export const transporter = nodemailer.createTransport(
  {

    host: process.env.SMTP_HOST || 'smtp.titan.email',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true for 465
    auth: {
      user: process.env.TITAN_EMAIL_USER || process.env.SMTP_USER,
      pass: process.env.TITAN_EMAIL_PASS || process.env.SMTP_PASS,
    },
    // debug: true, 
    // logger: true,
    tls: {
      rejectUnauthorized: false,
    }
  });
