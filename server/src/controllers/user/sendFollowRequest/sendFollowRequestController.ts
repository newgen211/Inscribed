import { Request, response, Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import { APIResponse } from '../../../types/response';
import { User, UserDocument } from '../../../models/UserModel';
import log from '../../../utils/log';
import { FollowRequestSchema } from './schema';
import { ZodError } from 'zod';


const sendFollowRequestController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Get the follow id from the request body
        const { followId } = FollowRequestSchema.parse(req.body);

        // Get the user document and the follow docuemnt
        const user: UserDocument | null       = await User.findById(userId);
        const followUser: UserDocument | null = await User.findById(followId);

        if(!user || !followUser) {

            const response: APIResponse = {
                message: 'User Not Found',
                code: 404
            };

            res.status(response.code).json(response);
            return;

        }

        // Make sure they are not trying to follow themselves
        if(userId === followId) {

            const response: APIResponse = {
                message: 'Cannot follow yourself',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }

        // Check to see if the user is already following this account
        if(user.following.includes(followUser.id)) {

            const response: APIResponse = {
                message: 'Already Following This Account',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }

        // Handle follow request when the user is public
        if(followUser.account_public) {

            user.following.push(followUser.id);
            followUser.followers.push(user.id);

            await user.save();
            await followUser.save();

            // return success message
            const response: APIResponse = {
                message: 'Successfully Following New Account',
                code: 200
            };

            res.status(response.code).json(response);
            return;

        }
        
        // Check to make sure the user has not already send a follow request
        if(followUser.follow_requests.includes(user.id)) {

            const response: APIResponse = {
                message: 'Already requested to follow this account',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }

        // Create the new follow request
        user.requests.push(followUser.id);
        followUser.follow_requests.push(user.id);

        await user.save();
        await followUser.save();

        // Return success request message
        const response: APIResponse = {
            message: 'Follow request sent to user',
            code: 200
        };

        res.status(response.code).json(response);
        return;        

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while requesting to follow a user: ${error}`, true);

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

export default sendFollowRequestController;