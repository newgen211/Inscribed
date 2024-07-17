import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { IUser, User } from '../../models/user.model';
import { APIResponse } from '../../types/APIResponse.type';
import { StatusCodes } from 'http-status-codes';
import sendVerificationEmail from '../../services/sendVerificationEmail.service';
import createVerificationToken from '../../utils/createVerificationToken.util';


const registerController = async (req: Request, res: Response): Promise<void> => {

    try {

        // Get the user's input data from the request body
        const { first_name, last_name, username, email, password } = req.body;

        // Check to see if the username and/or email is alreay in use
        const user: IUser | null = await User.findOne({ $or: [{ email }, { username }] });

        if(user) {

            const response: APIResponse = {
                message: 'User Conflict Error',
                code: StatusCodes.CONFLICT,
                errors: []
            };

            if(user.email === email) response.errors?.push({ field: 'email', message: 'Email is taken', code: StatusCodes.CONFLICT });
            if(user.username === username) response.errors?.push({ field: 'username', message: 'Username is taken', code: StatusCodes.CONFLICT });

            res.status(response.code).json(response);
            return;

        }

        // Hash the user's password for safe storage
        const hash: string = await argon2.hash(password);

        // Create the new user
        const newUser: IUser = new User({ first_name, last_name, username, email, password: hash });
        await newUser.save();

        // Send a account verification email
        await sendVerificationEmail(newUser.email, createVerificationToken(newUser));

        // Send success response
        const response: APIResponse = {
            message: 'Account Created Successfully',
            code: StatusCodes.CREATED
        };

        res.status(response.code).json(response);
        return;

    }
    
    catch(error) {

        // Log any errors that occur
        console.error(`Something went wrong while registering a new user: --- ${error} ---`);

        // Respond with a error
        const response: APIResponse = {
            message: 'Internal Server Error',
            code: StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default registerController;