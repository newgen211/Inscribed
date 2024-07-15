import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import { User, UserDocument } from '../../../models/UserModel';
import { APIResponse } from '../../../types/response';
import { Post, PostDocument } from '../../../models/PostModel';
import log from '../../../utils/log';


const getFeedController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Pagination parameters
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        // Get the user document
        const user: UserDocument | null = await User.findById(userId).populate('following');

        if (!user) {
            const response: APIResponse = {
                message: 'User not found',
                code: 404,
            };
            res.status(response.code).json(response);
            return;
        }

        // Simple feed alogorithm 
        // 1. Get posts from people the user follows
        // 2. Get them from most recent to least recent
        const posts: PostDocument[] = await Post.find({ userId: { $in: user.following } }).populate('userId', 'username').sort({ createdAt: -1 }).skip(skip).limit(limit);

        // Retrieve the total count of posts for pagination data
        const totalPosts = await Post.countDocuments({ userId: { $in: user.following } });

        // Return posts in success message
        const response: APIResponse = {
            message: 'Feed Posts',
            code: 200,
            data: {
                posts,
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts
            }
        };

        res.status(response.code).json(response);

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while getting user's feed: ${error}`, true);

        const response: APIResponse = {
            message: 'Internal server error',
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }

};

export default getFeedController;