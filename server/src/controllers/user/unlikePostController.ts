import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../types/APIResponse';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Response } from 'express';
import { IPost, Post } from '../../models/post';
import { Like } from '../../models/like';

const unlikePostController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the userId from the request
        const userId = (req.user as CustomJwtPayload).userId;

        // Get the id of the post we are liking
        const { postId } = req.body;

        // Ensure the post exists
        const post: IPost | null = await Post.findById(postId);
        
        if(!post) {

            const response: APIResponse = {
                message: 'Post not found',
                code:    StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ userId, postId });
        
        if (!existingLike) {

            const response: APIResponse = {
                message: 'Post not liked by the user',
                code: StatusCodes.CONFLICT
            };

            res.status(response.code).json(response);
            return;

        }

        // Remove the like
        await existingLike.deleteOne();

        // Decrement the like count on the post
        post.like_count -= 1;
        await post.save();

        // Return success response
        const response: APIResponse = {
            message: 'Post unliked successfully',
            code: StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }
    
    catch(error) {

        // Log error
        console.error(`Error while unliking post: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default unlikePostController;