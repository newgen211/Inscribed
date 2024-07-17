import Mail from 'nodemailer/lib/mailer';
import { transporter } from '../server';


const sendVerificationEmail = async (to: string, token: string): Promise<void> => {

    // Get the base url and from email address
    const base: string | undefined = process.env.DOMAIN;
    const from: string | undefined = process.env.MAIL_USER;

    // Make sure the base url is defined
    if(!base) {
        throw new Error('DOMAIN is not defined in environment variables');
    }

    // Make sure the from email is defined
    if(!from) {
        throw new Error('MAIL_USER is not defined in enviroment variables');
    }

    // Create the verification link
    const link: string = `${base}/verify-account?token=${token}`;

    // Configure the message to be sent
    const mailOptions: Mail.Options = {
        from,
        to,
        subject: 'Inscribed Social Account Verification',
        html: `
            <h3>Verify Your Inscribed Social Account</h3>
            <p>Click the link to verify your inscribed social account: <a href="${link}">Verify Account</a></p>
        `
    };

    // Send the mail
    try {
        
        await transporter.sendMail(mailOptions);

    }
    
    catch(error) {

        // Log and throw a error
        console.error(`Error sending verification email: --- ${error} ---`);
        throw new Error('Could not send verification email');

    }

};

export default sendVerificationEmail;