import { Request, Response } from 'express';
import { IUser, User } from '../../models/user.model';
import { APIResponse } from '../../types/APIResponse.type';
import { StatusCodes } from 'http-status-codes';
import sendVerificationEmail from '../../services/sendVerificationEmail.service';
import createVerificationToken from '../../utils/createVerificationToken.util';


const requestAccountVerificationEmailController = async (req: Request, res: Response): Promise<void> => {

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

        // Send a new verification email
        await sendVerificationEmail(user.email, createVerificationToken(user));

        // Send success response
        const response: APIResponse = {
            message: 'Verification email sent',
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

export default requestAccountVerificationEmailController;