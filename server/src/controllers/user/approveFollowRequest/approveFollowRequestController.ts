import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import { Response } from 'express';
import { ApproveFollowRequestSchema } from './schema';
import log from '../../../utils/log';
import { ZodError } from 'zod';
import { APIResponse } from '../../../types/response';
import { User, UserDocument } from '../../../models/UserModel';

const approveFollowRequestController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Get the requester id
        const { requesterId } = ApproveFollowRequestSchema.parse(req.body);

        // Get the user documents associated with the accounts
        const user: UserDocument | null = await User.findById(userId);
        const requester: UserDocument | null = await User.findById(requesterId);

        if(!user || !requester) {

            const response: APIResponse = {
                message: 'User Not Found',
                code: 404
            };

            res.status(response.code).json(response);
            return;

        }

        // Handle case where there are no follow request from the user
        if(!user.follow_requests.includes(requester.id)) {

            const response: APIResponse = {
                message: 'No follow request from this user',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }

        // Approve the follow request

        user.follow_requests = user.follow_requests.filter(id => id.toString() !== requester.id.toString());
        requester.requests   = requester.requests.filter(id => id.toString() !== user.id.toString());

        user.followers.push(requester.id);
        requester.following.push(user.id);

        await user.save();
        await requester.save();

        // return success message
        const response: APIResponse = {
            message: 'Successfully Following New Account',
            code: 200
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while approving a follow request: ${error}`, true);

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

export default approveFollowRequestController;