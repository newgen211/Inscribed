import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../types/APIResponse.type';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest.type';
import { Response } from 'express';
import { IPost, Post } from '../../models/post.model';

const createNewPostController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the userId and the post content
        const userId: string = (req.user as CustomJwtPayload).userId;
        const { content } = req.body;

        // Create a new post object
        const post: IPost = new Post({userId, content});

        // Save new post
        await post.save();

        // Send success response
        const response: APIResponse = {
            message: 'New post created successfully',
            code:    StatusCodes.CREATED
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log error
        console.error(`Error while creating a post: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default createNewPostController;