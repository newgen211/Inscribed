import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import log from '../../../utils/log';
import { APIResponse } from '../../../types/response';
import { User, UserDocument } from '../../../models/UserModel';


const deleteAccountController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Make sure user exists
        const user: UserDocument | null = await User.findById(userId);
        
        if(!user) {

            const response: APIResponse = {
                message: 'User not found',
                code: 404
            };

            res.status(response.code).json(response);
            return;

        }

        // Delete the account

        await User.findByIdAndDelete(userId);

        // return success message
        const response: APIResponse = {
            message: 'Account deleted successfully',
            code: 200
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while deleteing account: ${error}`, true);

        // Handle general error
        const response: APIResponse = {
            message: "Internal server error",
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }

};

export default deleteAccountController;