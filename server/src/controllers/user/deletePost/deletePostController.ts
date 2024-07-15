import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import { Post, PostDocument } from '../../../models/PostModel';
import { APIResponse } from '../../../types/response';
import log from '../../../utils/log';
import mongoose from 'mongoose';


const deletePostController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Get the post id from the query params
        const deleteId: string = req.query.deleteId as string;

        // Check if the deleteId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(deleteId)) {
            
            const response: APIResponse = {
                message: 'Invalid post ID',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }

        // Check to see if the post exists, and is owned by the user
        const post: PostDocument | null = await Post.findOne({ _id: deleteId, userId });

        if(!post) {

            const response: APIResponse = {
                message: 'Pot not found or you do not have permission to delete this post',
                code: 404
            };

            res.status(response.code).json(response);
            return;

        }

        // Delete the post
        await Post.deleteOne({ _id: deleteId });

        // send success response
        const response: APIResponse = {
            message: 'Post deleted successfully',
            code: 200
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        log('ERROR', `Something went wrong while deleting a post: ${error}`, true);

        // Handle general error
        const response: APIResponse = {
            message: 'Internal server error',
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }

};

export default deletePostController;