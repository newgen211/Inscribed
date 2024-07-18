import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../types/APIResponse';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Response } from 'express';
import { IUser, User } from '../../models/user';

const updateUsernameController = async (req: CustomRequest, res: Response): Promise<void> => {

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

        // Get the new username from the req body
        const { username } = req.body;

        // Check to see if the username is the same as it currently is
        if(username == user.username) {

            const response: APIResponse = {
                message: 'Username is the same',
                code:    StatusCodes.BAD_REQUEST
            };

            res.status(response.code).json(response);
            return;

        }

        // Check to see if the username is available
        const checkUsername = await User.findOne({ username });

        if(checkUsername) {

            const response: APIResponse = {
                message: 'User Conflict Error',
                code: StatusCodes.CONFLICT,
                errors: []
            };

            if(checkUsername.username === username) response.errors?.push({ field: 'username', message: 'Username is taken', code: StatusCodes.CONFLICT });

            res.status(response.code).json(response);
            return;

        }

        // Update the username
        user.username = username;

        await user.save();

        // Send success message
        const response: APIResponse = {
            message: 'Username changed successfully',
            code:    StatusCodes.OK
        };
        
        res.status(response.code).json(response);
        return;
        
    }

    catch(error) {

        // Log error
        console.error(`Error while changing username: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default updateUsernameController;