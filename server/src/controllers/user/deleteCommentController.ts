import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../types/APIResponse';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Response } from 'express';
import { Comment } from '../../models/comment';
import { Post } from '../../models/post';

const deleteCommentController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get userId from request body
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Get commentId from the request body
        const { commentId } = req.body;

        // Ensure comment exists
        const comment = await Comment.findById(commentId);

        if(!comment) {

            const response: APIResponse = {
                message: 'Comment not found',
                code:    StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Ensure comment belongs to the user
        if(comment.userId.toString() !== userId) {

            const response: APIResponse = {
                message: 'Unauthorized',
                code: StatusCodes.UNAUTHORIZED
            };

            res.status(response.code).json(response);
            return

        }

        // Delete the comment
        await comment.deleteOne();

        // Decrement the comment count on the associated post
        const post = await Post.findById(comment.postId);
        
        if (post) {
            post.comment_count -= 1;
            await post.save();
        }

        // Send success repsonse
        const response: APIResponse = {
            message: 'Comment deleted successfully',
            code: StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;


    }

    catch(error) {

        // Log error
        console.error(`Error while deleting comment: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default deleteCommentController;