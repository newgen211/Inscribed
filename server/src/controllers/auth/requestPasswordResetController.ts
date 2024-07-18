import { Request, Response } from 'express';
import { IUser, User } from '../../models/user';
import { APIResponse } from '../../types/APIResponse';
import { StatusCodes } from 'http-status-codes';
import sendPasswordResetEmail from '../../services/sendPasswordResetEmail';
import createPasswordResetToken from '../../utils/createPasswordResetToken';

const requestPasswordResetController = async (req: Request, res: Response): Promise<void> => {


    try {

        // Get the email from the request body
        const { email } = req.body;

        // Find the user by the email 
        const user: IUser | null = await User.findOne({ email });

        if(!user) {

            const response: APIResponse = {
                message: 'User not found',
                code:    StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Send a reset password email
        await sendPasswordResetEmail(user.email, createPasswordResetToken(user));

        // Send success response
        const response: APIResponse = {
            message: 'Password reset email sent',
            code:    StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }
    
    catch(error) {

        // Log the error
        console.error(`Error occured while requesting a verify account email: --- ${error} ---`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default requestPasswordResetController;