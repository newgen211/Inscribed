import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { RegisterSchema } from './schema';
import { APIResponse, ErrorDetail } from '../../../types/response';
import { User, UserDocument } from '../../../models/UserModel';
import log from '../../../utils/log';
import sendVerificationEmail from '../../../services/sendVerificationEmail';
import createVerifyToken from '../../../utils/createVerifyToken';

const registerController = async (req: Request, res: Response): Promise<void> => {

    try {

        // Use zod to validate user input
        const { first_name, last_name, username, email, password, confirm_password } = RegisterSchema.parse(req.body);

        // Check to see if the username and or email is already in use
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if(user) {

            const response: APIResponse = {
                message: 'Account Conflict Error',
                code: 409,
                errors: []
            };

            if(user.email === email) response.errors?.push({field: 'email', message: 'Email is taken', code: 'conflict_error'});
            if(user.username === username) response.errors?.push({field: 'username', message: 'Username is taken', code: 'conflict_error'});

            res.status(response.code).json(response);
            return;

        }

        // Hash the password for safe storage
        const hash = await argon2.hash(password);

        // Create the new user and save to database
        const newUser: UserDocument = new User( { first_name, last_name, username, email, password: hash } );
        await newUser.save();

        // Send a account verify email
        const verifyToken: string = createVerifyToken(newUser.id);
        sendVerificationEmail(newUser.email, verifyToken);

        // Return a success response
        const response: APIResponse = {
            message: 'User Registered Successfully',
            code: 201
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        // Log error
        log('ERROR', `Something went wrong while registering a new user: ${error}`, true);

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

export default registerController;