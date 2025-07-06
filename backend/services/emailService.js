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
        subject: 'Seu código de verificação - QuizDev',
        // Mensagem HTML personalizada:
        html: `
            <div style="font-family: Arial, sans-serif; background: #f6f8fa; padding: 32px;">
                <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 32px;">
                    <h2 style="color: #2d7ff9; text-align: center;">Bem-vindo ao <span style="color: #222;">QuizDev</span>!</h2>
                    <p style="font-size: 16px; color: #333; text-align: center;">
                        Seu código de verificação é:
                    </p>
                    <div style="font-size: 32px; font-weight: bold; color: #2d7ff9; text-align: center; letter-spacing: 8px; margin: 24px 0;">
                        ${otp}
                    </div>
                    <p style="font-size: 15px; color: #555; text-align: center;">
                        Digite este código para concluir seu cadastro.<br>
                        Se você não solicitou este código, ignore este e-mail.
                    </p>
                    <hr style="margin: 32px 0;">
                    <p style="font-size: 12px; color: #aaa; text-align: center;">
                        Equipe QuizDev &copy; ${new Date().getFullYear()}
                    </p>
                </div>
            </div>
        `
    });
}

module.exports = sendOtpEmail;