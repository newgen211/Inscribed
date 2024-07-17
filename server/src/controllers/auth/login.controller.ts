import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { IUser, User } from '../../models/user.model';
import { APIResponse } from '../../types/APIResponse.type';
import { StatusCodes } from 'http-status-codes';
import createLoginToken from '../../utils/createLoginToken.util';

const loginController = async (req: Request, res: Response): Promise<void> => {

    try {

        // Get the username and password from the request body
        const { username, email, password } = req.body;

        // Find the user document associated with the username or email
        const user: IUser | null = await User.findOne({ $or:[{ username }, { email }] });

        // Give general login credential response if user not found
        if(!user) {

            const response: APIResponse = {
                message: 'Invalid login credentials',
                code:    StatusCodes.UNAUTHORIZED
            };

            res.status(response.code).json(response);
            return;

        }

        // Check if the user's account is locked
        if(user.account_locked) {

            const response: APIResponse = {
                message: 'Account locked. Please reset your password',
                code:    StatusCodes.FORBIDDEN
            };

            res.status(response.code).json(response);
            return;

        }

        // Compare the passwords
        const passwordCompare: boolean = await argon2.verify(user.password, password);

        // Give general login credential error response if password incorrect
        if(!passwordCompare) {

            // Increment the login attempts by 1
            user.login_attempts++;

            if(user.login_attempts >= 5) {
                user.account_locked = true;
            }

            // Update the users document
            await user.save();

            // Error response

            const response: APIResponse = {
                message: 'Invalid login credentials',
                code:    StatusCodes.UNAUTHORIZED
            };

            res.status(response.code).json(response);
            return;

        }

        // Reset login attempts and update last login time
        user.login_attempts = 0;
        user.last_login     = new Date;
        await user.save();

        // Create Login token
        const token: string = createLoginToken(user);

        // Send success response
        const response: APIResponse = {
            message: 'Logged in successfully',
            code:    StatusCodes.OK,
            token:   token
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log the error
        console.error(`An error occured while logging in: --- ${error} ---`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }
    

};

export default loginController;