import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const createTransporter = (): nodemailer.Transporter<SMTPTransport.SentMessageInfo> => {


    // Get the nodemailer credentials
    const host: string | undefined = process.env.MAIL_HOST;
    const user: string | undefined = process.env.MAIL_USER;
    const pass: string | undefined = process.env.MAIL_PASS;

    // Make sure all the credentials are defined
    if(!host) {
        throw new Error('MAIL_HOST environment variable is not defined');
    }

    if(!user) {
        throw new Error('MAIL_USER environment variable is not defined');
    }

    if(!pass) {
        throw new Error('MAIL_PASS environment variable is not defined');
    }

    // Create the transporter
    const transporter = nodemailer.createTransport({
        host,
        port: 465,
        secure: true,
        auth: {
            user,
            pass
        }
    });

    return transporter;


};


export default createTransporter;