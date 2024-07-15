import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import log from '../../../utils/log';
import { APIResponse } from '../../../types/response';
import { User, UserDocument } from '../../../models/UserModel';


const getFollowersController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Find the user document and populate the followers field
        const user: UserDocument | null = await User.findById(userId).populate('followers', 'username');

        // Handle case where user is not found
        if (!user) {
            const response: APIResponse = {
                message: 'User not found',
                code: 404
            };

            res.status(response.code).json(response);
            return;
        }

        // Return a array of the user's follower's
        const response: APIResponse = {
            message: 'Users followers',
            code: 200,
            data: user.followers
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while getting users followers: ${error}`, true);

        // Handle general error
        const response: APIResponse = {
            message: 'Internal server error',
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }

};

export default getFollowersController;