import { Request, Response } from 'express';
import { RequestVerifyEmailSchema } from './schema';
import log from '../../../utils/log';
import { ZodError } from 'zod';
import { APIResponse } from '../../../types/response';
import { User, UserDocument } from '../../../models/UserModel';
import createVerifyToken from '../../../utils/createVerifyToken';
import sendVerificationEmail from '../../../services/sendVerificationEmail';


const requestVerifyEmailController = async (req: Request, res: Response): Promise<void> => {

    try {

        // Use zod to validate user input
        const { email } = RequestVerifyEmailSchema.parse(req.body);

        // Find the user document by email
        const user: UserDocument | null = await User.findOne({ email });

        if(!user) {

            const response: APIResponse = {
                message: 'If a account is associated with this email, a new link is on the way',
                code: 200
            };

            res.status(response.code).json(response);
            return;

        }

        // Generate verify token
        const token: string = createVerifyToken(user.id);

        // Send verify email
        await sendVerificationEmail(email, token);

        // Send success message
        const response: APIResponse = {
            message: 'If a account is associated with this email, a new link is on the way',
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

export default requestVerifyEmailController;