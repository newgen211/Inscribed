import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../types/requests/CustomRequest';
import { Post } from '../../types/models/Post';
import { PostDocument } from '../../model/Post';
import { APIResponse } from '../../types/responses/APIResponse';
 
const getAllPostsController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the user id from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Fetch all post documents with the user id
        const posts: PostDocument[] = await Post.find({ userId });

        // Return all posts
        const response: APIResponse = {

            timestamp: Date.now(),
            message: 'Users Posts',
            code: 200,
            data: posts

        };

        res.status(response.code).json(response);
        return;

    }
    catch(error) {

        const response: APIResponse = {
            timestamp: Date.now(),
            message: 'Internal Server Error',
            code: 500
        };

        res.status(response.code).json(response);
        return;

    }


};

export default getAllPostsController;