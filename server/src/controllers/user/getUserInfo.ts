import { StatusCodes } from 'http-status-codes';
import { IUser, User } from '../../models/user';
import { APIResponse } from '../../types/APIResponse';
import { CustomJwtPayload, CustomRequest } from '../../types/CustomRequest';
import { Response } from 'express';

const getUserInfo = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get userId from request body
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Find the user's document
        const user: IUser | null = await User.findById(userId);

        // Make sure the user is found
        if(!user) {

            const response: APIResponse = {
                message: 'User not found',
                code:    StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Return the users info
        const response: APIResponse = {
            message: 'User data',
            code:    StatusCodes.OK,
            data: {
                first_name:      user.first_name,
                last_name:       user.last_name,
                username:        user.username,
                email:           user.email,
                bio:             user.bio,
                verified:        user.account_verified,
                following_count: user.following_count,
                follower_count:  user.follower_count
            }
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log the error
        console.error(`Error while getting user info: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default getUserInfo;