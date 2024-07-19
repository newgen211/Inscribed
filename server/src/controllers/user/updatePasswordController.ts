import * as argon2 from 'argon2';
import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../types/APIResponse';
import { CustomRequest, CustomJwtPayload } from '../../types/CustomRequest';
import { Response } from 'express';
import { IUser, User } from '../../models/user';

const updatePasswordController = async (req: CustomRequest, res: Response): Promise<void> => {

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

        // Extract current password and new password from request
        const { current_password, new_password } = req.body;

        // Check if the current password matches what is on record
        const confirmCurrentPassword = await argon2.verify(user.password, current_password);

        if(!confirmCurrentPassword) {

            const response: APIResponse = {
                message: 'Current password incorrect',
                code:    StatusCodes.UNAUTHORIZED,
            };

            res.status(response.code).json(response);
            return;

        }

        // Hash the new password
        const hash: string = await argon2.hash(new_password);

        // Update the user's password
        user.password = hash;

        await user.save();

        // Send response message
        const response: APIResponse = {
            message: 'Password updated successfully',
            code:    StatusCodes.OK
        };

        res.status(response.code).json(response);
        return;

    }

    catch(error) {

        // Log error
        console.error(`Error while updating password: ${error}`);

        // Send error response
        const response: APIResponse = {
            message: 'Internal Server Error',
            code:    StatusCodes.INTERNAL_SERVER_ERROR
        };

        res.status(response.code).json(response);
        return;

    }

};

export default updatePasswordController;