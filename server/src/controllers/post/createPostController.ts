import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../types/requests/CustomRequest';
import { NewPost } from '../../schemas/post/NewPost';
import { APIResponse } from '../../types/responses/APIResponse';
import { ZodError } from 'zod';
import { PostDocument } from '../../types/models/Post'; 
import { Post } from '../../model/Post';


const createPostController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {
    // Use zod to validate the post meets validation requirments
    const { post }: NewPost = NewPost.parse(req.body);

    // Get the user id from the request
    const userId: string = (req.user as CustomJwtPayload).userId;

    // Construct a new post 
    const newPost: PostDocument = new Post({userId, post});

    // Save the new post to the db
    await newPost.save();

    // Return a success message
    const response: APIResponse = {
        timestamp: Date.now(),
        message: 'Post Created Successfully',
        code: 201
    };

    res.status(response.code).json(response);
    return;
    
    }
    catch(error) {

        //console.log(error);

        if(error instanceof ZodError) {

            const response: APIResponse = {
                timestamp: Date.now(),
                message: 'Validation Error',
                code: 400
            };

            res.status(response.code).json(response);
            return;

        }
        
        // Handle general errors
        const response: APIResponse = {
            timestamp: Date.now(),
            message: 'Internal Server Error',
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }


};

export default createPostController;