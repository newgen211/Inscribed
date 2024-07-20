import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../types/APIResponse';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Response } from 'express';
import { Post } from '../../models/post';

import mongoose from 'mongoose';

const getPostsController = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId: string = (req.user as CustomJwtPayload).userId;
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const limit: number = parseInt(req.query.limit as string, 10) || 10;
        
        const posts = await Post.aggregate([

            // Match the posts by userId
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },

            // Pagination logic
            { $skip: (page - 1) * limit },
            { $limit: limit },

            // Join with the User collection to fetch the username
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user_info'
                }
            },

            // Unwind the result since lookup results in an array
            { $unwind: '$user_info' },

            // Join with the Like collection to count likes and check if the current user liked the post
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes_info'
                }
            },

            // Add computed fields
            {
                $addFields: {
                    number_of_likes: { $size: '$likes_info' },
                    did_i_like_post: {
                        $in: [new mongoose.Types.ObjectId(userId), '$likes_info.userId']
                    },
                    username: '$user_info.username',
                    post_belongs_to_me: { $eq: ['$userId', new mongoose.Types.ObjectId(userId)] },
                    time_posted: '$created_at',
                    user_id: '$userId',
                    post_content: '$content'
                }
            },

            // Select the required fields
            {
                $project: {
                    user_id: 1,
                    time_posted: 1,
                    post_belongs_to_me: 1,
                    username: 1,
                    post_content: 1,
                    number_of_likes: 1,
                    did_i_like_post: 1,
                }
            }
            
        ]);

        const response: APIResponse = {
            message: 'User posts',
            code:    StatusCodes.OK,
            data:    posts
        };

        res.status(response.code).json(response);
        return;
    } catch (error) {
        console.error(`Error while getting user posts: ${error}`);

        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;
    }
};

export default getPostsController;
