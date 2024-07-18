import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../types/APIResponse';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Response } from 'express';
import { User } from '../../models/user';
import { Follower } from '../../models/follower';

const followUserController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the userId from the request
        const userId = (req.user as CustomJwtPayload).userId;

        const { followingId } = req.body;

        // Check if the user to be followed exists
        const userToFollow = await User.findById(followingId);

        if (!userToFollow) {

            const response: APIResponse = {
                message: 'User to follow not found',
                code: StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

         // Check if the user is already following the user
         const existingFollow = await Follower.findOne({ followerId: userId, followingId });

         if (existingFollow) {

             const response: APIResponse = {
                 message: 'You are already following this user',
                 code: StatusCodes.CONFLICT
             };

             res.status(response.code).json(response);
             return;

         }

         // Create a new follow record
        const newFollow = new Follower({ followerId: userId, followingId });
        await newFollow.save();

        // Increment the follower and following count
        userToFollow.follower_count += 1;
        await userToFollow.save();

        const user = await User.findById(userId);
        if (user) {
            user.following_count += 1;
            await user.save();
        }

        // Send success response
        const response: APIResponse = {
            message: 'User followed successfully',
            code: StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log error
        console.error(`Error while following user: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default followUserController;