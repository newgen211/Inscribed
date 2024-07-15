import nodemailer from 'nodemailer';
import log from '../utils/log';

const sendVerificationEmail = async (to: string, verifyToken: string) => {

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
    const verifyUrl = `${domain}/api/auth/verify-account?token=${verifyToken}`;

    // Create the email message
    const mail = {
        from: email_user,
        to: to,
        subject: 'Verify your Inscribed Account',
        html: `
            <h2>Verify your Inscribed Account</h2>
            <p>Click the link to verify your account: <a href="${verifyUrl}">Verify</a></p>
        `
    };

    // Send the message
    try {

        await transporter.sendMail(mail);

    }
    catch(error) {

        log('ERROR', `Something went wrong when sending verification email: ${error}`);
        throw new Error("Error sending verification email");

    }

};

export default sendVerificationEmail;