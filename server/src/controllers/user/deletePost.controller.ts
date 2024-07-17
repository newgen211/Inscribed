import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../types/APIResponse.type';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest.type';
import { Response } from 'express';
import { IPost, Post } from '../../models/post.model';
import { Like } from '../../models/like.model';
import { Comment } from '../../models/comment.model';

const deletePostController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the userId from the request
        const userId = (req.user as CustomJwtPayload).userId;

        // Get the postId
        const { postId } = req.body;
        
        // Check if the post exists
        const post: IPost | null = await Post.findById(postId);

        if(!post) {

            const response: APIResponse = {
                message: 'Post not found',
                code:    StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Make sure post belongs to user
        if(post.userId.toString() !== userId) {

            const response: APIResponse = {
                message: 'Unauthorized',
                code:    StatusCodes.UNAUTHORIZED
            };

            res.status(response.code).json(response);
            return;

        }

        // Delete all the likes associated with the post
        await Like.deleteMany({ postId });

        // Delete all comments associated with the post
        await Comment.deleteMany({ postId });

        // Delete the post
        await post.deleteOne();

        // Send success response
        const response: APIResponse = {
            message: 'Post deleted successfully',
            code:    StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log error
        console.error(`Error while deleting post: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default deletePostController;