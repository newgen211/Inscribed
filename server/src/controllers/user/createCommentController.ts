import { StatusCodes } from 'http-status-codes';
import { IPost, Post } from '../../models/post';
import { APIResponse } from '../../types/APIResponse';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Response } from 'express';
import { Comment, IComment } from '../../models/comment';

const createCommentController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get userId from request body
        const userId: string = (req.user as CustomJwtPayload).userId;

        const { postId, content } = req.body;

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

        // Create a new comment
        const comment: IComment = new Comment({ userId, postId, content });

        await comment.save();

        // Increment the commentr count on the post
        post.comment_count++;
        await post.save();

        // Send success response
        const response: APIResponse = {
            message: 'Comment created successfully',
            code: StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log error
        console.error(`Error while creating comment: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default createCommentController;