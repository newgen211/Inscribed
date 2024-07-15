import * as argon2 from 'argon2';
import { Request, response, Response } from 'express';
import { LoginSchema } from './schema';
import { number, ZodError } from 'zod';
import { APIResponse } from '../../../types/response';
import log from '../../../utils/log';
import { User } from '../../../models/UserModel';
import createSessionToken from '../../../utils/createSessionToken';


const loginController = async (req: Request, res: Response): Promise<void> => {

    const loginAttemptsAmount: number = 5;

    try {

        // Use zod to validate user input
        const { username, password } = LoginSchema.parse(req.body);

        // Find the user's document by the username provided
        const user = await User.findOne({ username });

        // Handle case where user does not exist
        if(!user) {

            const response: APIResponse = {
                message: 'Invalid Username or Password',
                code: 401
            };

            res.status(response.code).json(response);
            return;

        }

        // Check to make sure the user's account is verified
        if(!user.verified) {

            const response: APIResponse = {
                message: 'User Account Not Verified',
                code: 401
            };

            res.status(response.code).json(response);
            return;

        }

        // Check to make sure the user's account is not locked
        if(user.locked) {

            const response: APIResponse = {
                message: 'Account Is Locked. Reset Your Password',
                code: 403
            };

            res.status(response.code).json(response);
            return;

        }

        // Compare the password provided with the passwors on record
        const passwordsMatch = await argon2.verify(user.password, password);

        // Handle case where the password does not match
        if(!passwordsMatch) {

            // Increment login attempts by 1
            user.login_attempts++;

            // If the user's login attempts is 5 or more lock the account
            if(user.login_attempts >= loginAttemptsAmount) {
                user.locked = true;
            }

            // Save the new info to the db
            await user.save();

            // Return error repsonse
            const response: APIResponse = {
                message: 'Invalid Username or Password',
                code: 401
            };

            res.status(response.code).json(response);
            return;

        }

        // Update last login time
        user.login_attempts = 0;
        user.last_login = new Date();
        await user.save();

        // Generate new login session
        const token: string = createSessionToken(user);

        // Return login token in response
        const response: APIResponse = {
            message: 'Successfully Logged In',
            code: 200,
            token: token
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while logging in a user: ${error}`, true);

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

export default loginController;