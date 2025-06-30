const nodemailer = require('nodemailer');

async function sendOtpEmail(to, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Seu código OTP',
        text: `Seu código de verificação é: ${otp}`
    });
}

module.exports = sendOtpEmail;