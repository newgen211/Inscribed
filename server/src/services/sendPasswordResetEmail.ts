import nodemailer from 'nodemailer';
import log from '../utils/log';

const sendPasswordResetEmail = async (to: string, resetToken: string) => {

    // Get the base url domain from .env
    const domain: string | undefined = process.env.DOMAIN;

    // Get NodeMailer account details
    const email_host: string | undefined = process.env.EMAIL_HOST;
    const email_user: string | undefined = process.env.EMAIL_USER;
    const email_pass: string | undefined = process.env.EMAIL_PASS;

    // Create NodeMailer Transporter
    const transporter = nodemailer.createTransport({

        host: email_host,
        port: 465,
        secure: true,
        auth: {
            user: email_user,
            pass: email_pass
        }

    });

    // Create the verify-account url
    const resetUrl = `${domain}/reset-password?token=${resetToken}`;

    // Create the email message
    const mail = {
        from: email_user,
        to: to,
        subject: 'Reset Your Inscribed Account Password',
        html: `
            <h2>Reset Your Insribed Account Password</h2>
            <p>Click the link to reset your password: <a href="${resetUrl}">Reset Password</a></p>
        `
    };

    // Send the message
    try {

        await transporter.sendMail(mail);

    }
    catch(error) {

        log('ERROR', `Something went wrong when sending password reset email: ${error}`);
        throw new Error("Error sending password reset email");

    }

};

export default sendPasswordResetEmail;