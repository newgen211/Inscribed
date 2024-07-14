import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../types/requests/CustomRequest';
import { APIResponse } from '../../types/responses/APIResponse';
import mongoose from 'mongoose';
import { Following } from '../../model/Following';


const followController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Get the following id
        const followingId = req.body.followingId;

        // Make sure the person they are trying to follow exists
        if(!followingId) {


            const response: APIResponse = {
                timestamp: Date.now(),
                message: 'User not found',
                code: 404
            };

            res.status(response.code).json(response);
            return;

        }

        // Make sure the user is not trying to follow themselves
        if(followingId === userId) {

            const response: APIResponse = {
                timestamp: Date.now(),
                message: 'Cannot follow yourself',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }

        // Make sure the id's provided are valid mongo db id's
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(followingId)) {
            res.status(400).json({ message: 'Invalid user or following ID.' });
            return;
        }

        // Check to make sure the user does not already follow this account
        const existingFollow = await Following.findOne({ userId, followingId });

        if (existingFollow) {
            
            const response: APIResponse = {
                timestamp: Date.now(),
                message: 'Already following user',
                code: 409
            };

            res.status(response.code).json(response);
            return;
        }

        // Create the new follower
        const newFollow = new Following({ userId, followingId });
        await newFollow.save();

        // Return success message
        const response: APIResponse = {
            timestamp: Date.now(),
            message: 'Following new user',
            code: 201
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        console.log(error);
        
        const response: APIResponse = {
            timestamp: Date.now(),
            message: 'Internal Server Error',
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }

};

export default followController;