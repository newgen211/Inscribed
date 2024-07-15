import { Request, Response } from 'express';
import { APIResponse } from '../../../types/response';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../../../models/UserModel';
import log from '../../../utils/log';

const verifyAccountController = async (req: Request, res: Response): Promise<void> => {

    try {

        // Extract the verify token from the query params
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

        // Check to make sure the user is not already verified
        if(user.verified) {

            const response: APIResponse = {

                message: 'User already verified',
                code: 400,
                errors: [{ field: 'userId', message: 'User is already verified', code: 'already_verified' }]

            };

            res.status(response.code).json(response);
            return;

        }

        // Update the user's verifed status
        user.verified = true;
        await user.save();

        // Return a success message
        const response: APIResponse = {
            message: 'User Account Verifed Successfully',
            code: 200
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while verifying a user's account: ${error}`, true);

        if(error instanceof jsonwebtoken.JsonWebTokenError) {

            const response: APIResponse = {
                message: 'Invalid Verification Token',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }

        if(error instanceof jsonwebtoken.TokenExpiredError) {

            const response: APIResponse = {
                message: 'Validation Token Expired',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }

        // Handle general errors
        const response: APIResponse = {
            message: 'Internal Server Error',
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }

};

export default verifyAccountController;