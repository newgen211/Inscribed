import { StatusCodes } from 'http-status-codes';
import { IUser, User } from '../../models/user.model';
import { APIResponse } from '../../types/APIResponse.type';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest.type';
import { Response } from 'express';

const updateBioController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the userId from the request
        const userId: string = (req.user as CustomJwtPayload).userId;

        // Find the user by id
        const user: IUser | null = await User.findById(userId);

        if(!user) {

            const response: APIResponse = {
                message: 'User not found',
                code:    StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Get the bio from the request body
        const { bio } = req.body;

        // Update the bio
        user.bio = bio;
        await user.save();

        // Send success response
        const response: APIResponse = {
            message: 'User bio updated successfully',
            code:    StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }
    
    catch(error) {

        // Log error
        console.error(`Error while updating users bio: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default updateBioController;