import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../types/APIResponse';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Response } from 'express';
import { IPost, Post } from '../../models/post';
import { ILike, Like } from '../../models/like';

const likePostController = async (req: CustomRequest, res: Response): Promise<void> => {

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

        // Check to see if the user already liked the post
        const existingLike = await Like.findOne({ userId, postId });

        if(existingLike) {

            const response: APIResponse = {
                message: 'Post already liked',
                code:    StatusCodes.CONFLICT
            };

            res.status(response.code).json(response);
            return;

        }

        // Create a new like for the post
        const like: ILike = new Like({ userId, postId });
        await like.save();

        // Increment the like counter on the post by 1
        post.like_count++;
        await post.save();

        // Send success response
        const response: APIResponse = {
            message: 'Post liked successfully',
            code: StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;
    
    }

    catch(error) {

       // Log error
       console.error(`Error while liking post: ${error}`);

       // Send error response
       const response: APIResponse = {
           message: 'Internal Server Error',
           code:    StatusCodes.INTERNAL_SERVER_ERROR
       };

       res.status(response.code).json(response);
       return;             

    }

};

export default likePostController;