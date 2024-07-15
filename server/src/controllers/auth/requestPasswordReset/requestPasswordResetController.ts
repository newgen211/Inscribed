import { Request, Response } from 'express';
import log from '../../../utils/log';
import { ZodError } from 'zod';
import { APIResponse } from '../../../types/response'; 
import { RequestPasswordResetSchema } from './schema';
import { User, UserDocument } from '../../../models/UserModel';
import createResetToken from '../../../utils/createResetToken';
import sendPasswordResetEmail from '../../../services/sendPasswordResetEmail';


const requestPasswordResetController = async (req: Request, res: Response): Promise<void> => {

    try {

        // Use zod to validate user input
        const { email } = RequestPasswordResetSchema.parse(req.body);

        // Verify the email is associated with a valid account
        const user: UserDocument | null = await User.findOne({email});

        // Return response if user not found
        if(!user) {

            const response: APIResponse = {
                message: 'If that email address is associated with a account, a reset email is on the way',
                code: 200
            };

            res.status(response.code).json(response);
            return;

        }

        // Generate a password reset token
        const token: string = createResetToken(user.id);

        // Send password reset email
        await sendPasswordResetEmail(user.email, token);

        // Return success response
        const response: APIResponse = {
            message: 'Password Reset Email Sent',
            code: 200
        };

        res.status(response.code).json(response);
        return;


    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while requesting a password reset: ${error}`, true);

        // Catch any input validation errors
        if(error instanceof ZodError) {

            const response: APIResponse = { 
                message: 'Validation Error',
                code: 400,
                errors: error.errors.map(err => ({ field: err.path.join('.'), message: err.message, code: err.code }))
             };

             res.status(response.code).json(response);
             return;

        }

        // Catch general error
        const response: APIResponse = {
            message: 'Internal Server Error',
            code: 50
        };

        res.status(response.code).json(response);
        return;

    }

};

export default requestPasswordResetController;