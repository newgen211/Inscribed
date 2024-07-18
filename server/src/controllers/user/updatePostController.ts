import { Response } from 'express';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Post } from '../../models/post';
import { APIResponse } from '../../types/APIResponse';
import { StatusCodes } from 'http-status-codes';


const updatePostController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the userId from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Get postId and updated content
        const { postId, content } = req.body;

        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            
            const response: APIResponse = {

                message: 'Post not found',
                code: StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Check if the user is the owner of the post
        if (post.userId.toString() !== userId) {

            const response: APIResponse = {
                message: 'Unauthorized',
                code: StatusCodes.UNAUTHORIZED
            };

            res.status(response.code).json(response);
            return;

        }

        // Update the post content
        post.content = content;
        post.updated_at = new Date();
        await post.save();

        // Send success message
        const response: APIResponse = {
            message: 'Post updated successfully',
            code: StatusCodes.OK
        };
    
        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log Error
        console.error(`Error updating post: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code: StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default updatePostController;