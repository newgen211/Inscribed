import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../types/CustomRequest.type';
import { IUser, User } from '../../models/user.model';
import { APIResponse } from '../../types/APIResponse.type';
import { StatusCodes } from 'http-status-codes';

const deleteAccountController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the userId from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Find the user by id
        const user: IUser | null = await User.findById(userId);

        if(!user) {

            const response: APIResponse = {
                message: 'User not found',
                code:    StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Delete the account
        await User.findByIdAndDelete(user.id);

        // Send success message
        const response: APIResponse = {
            message: 'Account deleted successfully',
            code:    StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }
    
    catch(error) {

        // Log the error
        console.error(`Error while deleting user account: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default deleteAccountController;