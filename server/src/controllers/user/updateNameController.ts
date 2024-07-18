import { Response } from 'express';
import { CustomJwtPayload, CustomRequest } from '../../types/CustomRequest';
import { APIResponse } from '../../types/APIResponse';
import { StatusCodes } from 'http-status-codes';
import { IUser, User } from '../../models/user';


const updateNameController = async (req: CustomRequest, res: Response): Promise<void> => {

    try {

        // Get the userId from the request
        const userId = (req.user as CustomJwtPayload).userId;

        // Find the user document
        const user: IUser | null = await User.findById(userId);

        if(!user) {

            const response: APIResponse = {
                message: 'User not found',
                code:    StatusCodes.NOT_FOUND
            };

            res.status(response.code).json(response);
            return;

        }

        // Get the first_name and last_name
        const { first_name, last_name } = req.body;

        // Update the first_name and last_name if provided
        if(first_name !== undefined && first_name !== user.first_name) user.first_name = first_name;
        if(last_name !== undefined && last_name !== user.last_login) user.last_name = last_name;

        await user.save();

        // Send success response
        const response: APIResponse = {
            message: 'Users name updated successfully',
            code:    StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log error
        console.error(`Error while updating users name: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default updateNameController;