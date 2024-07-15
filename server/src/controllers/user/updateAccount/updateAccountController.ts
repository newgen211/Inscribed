import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import { Response } from 'express';
import { UpdateAccountSchema } from './schema';
import log from '../../../utils/log';
import { ZodError } from 'zod';
import { APIResponse } from '../../../types/response';
import { User, UserDocument } from '../../../models/UserModel';



const updateAccountController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Get new account details
        const { first_name, last_name, account_public } = UpdateAccountSchema.parse(req.body);

        // Get the user's document
        const user: UserDocument | null = await User.findById(userId);

        if(!user) {

            const response: APIResponse = {
                message: 'User not found',
                code: 404
            };

            res.status(response.code).json(response);
            return;

        }

        // Update the user's info
        user.first_name = first_name;
        user.last_name  = last_name;
        user.account_public     = account_public;

        await user.save();

        // Return success message
        const response: APIResponse = {
            message: 'Successfully updated user profile',
            code: 200
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while updating account: ${error}`, true);

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

        // Handle general errors
        const response: APIResponse = {
            message: 'Internal Server Error',
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }

};

export default updateAccountController;