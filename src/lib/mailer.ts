import nodemailer from 'nodemailer';



// export const transporter = nodemailer.createTransport(
//   {

//     host: process.env.SMTP_HOST || 'smtp.ionos.com',
//     port: Number(process.env.SMTP_PORT) || 587,
//     secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//     connectionTimeout: 8000, // 5 seconds max wait before giving up
//     debug: true, 
//     logger: true,
//     tls: {
//       rejectUnauthorized: false,
//     }
//   });
export const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,            // <-- HARDCODED TO 587
  secure: false,        // <-- HARDCODED TO FALSE
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 20000, // Increased to 20 seconds just in case
  debug: true,
  logger: true,
  tls: {
    rejectUnauthorized: false,
  }
});
