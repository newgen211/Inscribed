import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../../middlewares/isLoggedIn';
import log from '../../../utils/log';
import { APIResponse } from '../../../types/response';
import { NewPostSchema } from './schema';
import { ZodError } from 'zod';
import { Post, PostDocument } from '../../../models/PostModel';


const createNewPostController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // validate the post in the request meets the post validation requirments
        const { post } = NewPostSchema.parse(req.body);

        // Create the new post
        const newPost: PostDocument = new Post({userId, post});
        await newPost.save();

        // Return success message
        const response: APIResponse = {
            message: 'New post created successfully',
            code: 201
        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while creating a new post: ${error}`, true);

        // Catch any input validation errors
        if(error instanceof ZodError) {

            const response: APIResponse = { 
                message: 'Validation Error',
                code: 400,
                errors: error.errors.map(err => ({ field: err.path.join('.'), message: err.message, code: err.code }))
             };

             res.status(response.code).json(response);
             return;

        }

        // Handle general errors
        const response: APIResponse = {
            message: 'Internal server error',
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }

};

export default createNewPostController;