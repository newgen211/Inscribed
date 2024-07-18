import { StatusCodes } from 'http-status-codes';
import { Follower } from '../../models/follower';
import { APIResponse } from '../../types/APIResponse';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Response } from 'express';
import { User } from '../../models/user';

const unfollowUserController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the userId from the request
        const userId = (req.user as CustomJwtPayload).userId;

        const { followingId } = req.body;

        // Check if the following user
        const existingFollow = await Follower.findOne({ followerId: userId, followingId });
        
        if (!existingFollow) {

            const response: APIResponse = {
                message: 'You are not following this user',
                code: StatusCodes.CONFLICT
            };

            res.status(response.code).json(response);
            return;

        }

        // Remove the follow relationship
        await existingFollow.deleteOne();

        // Decrement the follower and following counts
        const userToUnfollow = await User.findById(followingId);
        if (userToUnfollow) {
            userToUnfollow.follower_count -= 1;
            await userToUnfollow.save();
        }

        const user = await User.findById(userId);
        
        if (user) {
            user.following_count -= 1;
            await user.save();
        }

        // Send success response
        const response: APIResponse = {
            message: 'User unfollowed successfully',
            code:    StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log error
        console.error(`Error while unfollowing user: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default unfollowUserController;