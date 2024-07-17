import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../types/CustomRequest.type';
import { APIResponse } from '../../types/APIResponse.type';
import { StatusCodes } from 'http-status-codes';
import { Follower, IFollower } from '../../models/follower.model';


const getFollowersController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Pagination parameters
        const page = parseInt(req.query.page as string) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        // Fetch follower documents with pagination
        const followers: IFollower[] = await Follower.find({ followingId: userId })
        .populate('followerId', 'username')
        .limit(limit).skip(skip);

        // Retrieve the total count of comments for the post for pagination data
        const totalFollowers = await Follower.countDocuments({ followingId: userId });

        // Send success message
        const response: APIResponse = {
            message: 'Followers fetched successfully',
            code:    StatusCodes.OK,
            data: {
                followers,
                currentPage: page,
                totalPages: Math.ceil(totalFollowers / limit),
                totalFollowers
            }
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log error
        console.error(`Error while getting followers: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default getFollowersController;