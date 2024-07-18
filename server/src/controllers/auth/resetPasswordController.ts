import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { APIResponse } from '../../types/APIResponse';
import { StatusCodes } from 'http-status-codes';
import { IUser, User } from '../../models/user';

const resetPasswordController = async (req: Request, res: Response): Promise<void> => {

    try {

        // Get the reset token from the query parameters
        const token: string | undefined = req.query.token as string | undefined;

        // Make sure the token is present
        if(!token) {

            const response: APIResponse = {
                message: 'Password Reset Token Missing',
                code:    StatusCodes.BAD_REQUEST
            };

            res.status(response.code).json(response);
            return;

        }

        // Get the JWT SECRET from enviroment variables
        const jwt_secret: string | undefined = process.env.JWT_SECRET;

        // Ensure the secret is defined in enviroment variables
        if(!jwt_secret) {
            throw new Error('JWT_SECRET is not defined in enviroment variables');
        }

        // Verify the token against the jwt secret
        const decoded = jwt.verify(token, jwt_secret) as {userId: string};
        
        // Extract the user's id from the verify token
        const userId: string = decoded.userId;

        // Find the user's document in the database
        const user: IUser | null = await User.findById(userId);

        // Handle case if user is not found
        if(!user) {

            const response: APIResponse = {
                message: 'User not found',
                code:    StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Get the new password from the request body
        const { password } = req.body;

        // Hash the password
        const hash: string = await argon2.hash(password);

        // Update the user's password
        user.password = hash;
        user.account_locked = false;
        user.login_attempts = 0;
        await user.save();

        // Return success resonse
        const response: APIResponse = {
            message: 'Password updated successfully',
            code: StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;


    }

    catch(error) {

        // Log the error
        console.error(`An error occured while verifying a user: --- ${error} ---`);

        // Handle case were token is expired
        if(error instanceof jwt.TokenExpiredError) {

            const response: APIResponse = {
                message: 'Password reset token has expired',
                code:    StatusCodes.UNAUTHORIZED
            };

            res.status(response.code).json(response);
            return;

        }

        // Handle case where token is invalid
        if(error instanceof jwt.JsonWebTokenError) {

            const response: APIResponse = {
                message: 'Password reset token invalid',
                code:    StatusCodes.BAD_REQUEST
            };

            res.status(response.code).json(response);
            return;

        }

        // Respond with error
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default resetPasswordController;