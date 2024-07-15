import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import { Post } from '../../../models/PostModel';
import { APIResponse } from '../../../types/response';
import log from '../../../utils/log';
import { PipelineStage } from 'mongoose';

const getDiscoverController = async (req: CustomRequest, res: Response): Promise<void> => {
    
    try {
        
        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Pagination parameters
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        // Use a Aggregate pipleline to find posts that are public
        const pipeline: PipelineStage[] = [

            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },

            {
                $unwind: '$user'
            },

            {
                $match: {
                    'user.account_public': true
                }
            },

            {
                $sort: {
                    createdAt: -1
                }
            },

            {
                $facet: {
                    metadata: [{ $count: "total" }, { $addFields: { page } }],
                    posts: [{ $skip: skip }, { $limit: limit }]
                }
            }

        ];

        const result = await Post.aggregate(pipeline);
        const posts = result[0].posts;
        const metadata = result[0].metadata[0];

        const totalPosts = metadata.total;
        const totalPages = Math.ceil(totalPosts / limit);

        const response: APIResponse = {
            message: 'Posts retrieved successfully',
            code: 200,
            data: {
                posts,
                currentPage: page,
                totalPages,
                totalPosts
            }
        };

        res.status(response.code).json(response);
        

    } 
    catch (error) {
        
        log('ERROR', `Something went wrong while getting discover posts: ${error}`, true);

        const response: APIResponse = {
            message: 'Internal server error',
            code: 500
        };

        res.status(response.code).json(response);

    }
};

export default getDiscoverController;