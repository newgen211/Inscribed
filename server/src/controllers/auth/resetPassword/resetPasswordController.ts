import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import log from '../../../utils/log';
import { ZodError } from 'zod';
import { APIResponse } from '../../../types/response';
import { ResetPasswordSchema } from './schema';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../../../models/UserModel';


const resetPasswordController = async (req: Request, res: Response): Promise<void> => {

    try {

        // Use zod to validate user input
        const { password, confirm_password } = ResetPasswordSchema.parse(req.body);

        // Get the password reset token from the request params
        const token: string = req.query.token as string;

        // Handle case when there is no token provided
        if(!token) {

            const response: APIResponse = {
                message: 'No token provided',
                code: 400,
                errors: [{ field: 'token', message: 'Token is required', code: 'no_token' }]
            };

            res.status(response.code).json(response);
            return;

        }

        // Verify the jwt
        const JWT_SECRET: string | undefined = process.env.JWT_SECRET ?? '';

        const decoded = jsonwebtoken.verify(token, JWT_SECRET) as { userId: string };

        // Get the id from the decoded token
        const userId: string = decoded.userId;

        // Find the user's document by the id from the decoded token
        const user = await User.findById(userId);

        // Return a error if the user is not found
        if(!user) {

            const response: APIResponse = {
                message: 'User not found',
                code: 404
            };

            res.status(response.code).json(response);
            return;

        }

        // Hash the new password
        const hash: string = await argon2.hash(password);

        // Update the user's password
        user.password = hash;
        await user.save();

        // Return success message
        const response: APIResponse = {
            message: 'Password Reset Successfully',
            code: 200
        };

        res.status(response.code).json(response);
        return;


    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while resetting a users password: ${error}`, true);

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

export default resetPasswordController;