import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const redirectToPasswordResetController = (req: Request, res: Response): void => {

    try {
        // Get the reset token
        const token: string = req.params.token;
        const JWT_SECRET: string = process.env.JWT_SECRET || '';

        // Validate the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Redirect to the reset-password page
        res.status(200).redirect(`/reset-password/${token}`);
    }
    catch(error) {
        
        console.error(error);
        res.status(400).redirect('/login');

    }

};

export default redirectToPasswordResetController;