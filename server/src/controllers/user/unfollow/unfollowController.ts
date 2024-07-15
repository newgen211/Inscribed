import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import { User, UserDocument } from '../../../models/UserModel';
import { APIResponse } from '../../../types/response';
import { UnfollowSchema } from './schema';
import mongoose from 'mongoose';
import log from '../../../utils/log';
import { ZodError } from 'zod';


const unfollowController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Verify the account id the user wants to unfollow is included in the request
        const { unfollowId } = UnfollowSchema.parse(req.body);

        // Get the user's document
        const user: UserDocument | null = await User.findById(userId);
        const unfollowUser: UserDocument | null = await User.findById(unfollowId);

        if(!user || !unfollowUser) {

            const response: APIResponse = {
                message: 'User not found',
                code: 404
            };

            res.status(response.code).json(response);
            return;

        }

        // Check to see if the user is following the account
        if(!user.following.includes(unfollowUser.id)) {

            const response: APIResponse = {
                message: 'User already does not follow this account',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }

        // Unfollow the account
        user.following = user.following.filter(id => id.toString() !== unfollowUser.id.toString());
        unfollowUser.followers = unfollowUser.followers.filter(id => id.toString() !== user.id.toString());

        await user.save();
        await unfollowUser.save();

        // return success message
        const response: APIResponse = {
            message: 'Successfully unfollowed user',
            code: 200
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while unfollowing a user: ${error}`,true);

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

export default unfollowController;