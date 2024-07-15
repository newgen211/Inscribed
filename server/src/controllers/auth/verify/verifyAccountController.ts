import { Request, Response } from 'express';
import { APIResponse } from '../../../types/response';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../../../models/UserModel';
import log from '../../../utils/log';

const verifyAccountController = async (req: Request, res: Response): Promise<void> => {

    try {

        // Extract the verify token from the query params
        const token: string = req.query.token as string;

        // Handle case when there is no token provided
        if(!token) {

            res.redirect('/unsuccessful-account-verification');
            return;

        }

        // Verify the jwt
        const JWT_SECRET: string | undefined = process.env.JWT_SECRET ?? '';

        const decoded = jsonwebtoken.verify(token, JWT_SECRET) as { userId: string };

        // Get the id from the decoded token
        const userId: string = decoded.userId;

        // Find the user's document by the id from the decoded token
        const user = await User.findById(userId);

        // Return a error if the user is not found
        if(!user) {

            res.redirect('/unsuccessful-account-verification');
            return;

        }

        // Check to make sure the user is not already verified
        if(user.verified) {

            res.redirect('/account-already-verifed');
            return;

        }

        // Update the user's verifed status
        user.verified = true;
        await user.save();

        // Return a success message
        res.redirect('/successful-account-verification');
        return;

    }
    catch(error) {

        // Log the error
        log('ERROR', `Something went wrong while verifying a user's account: ${error}`, true);

        if(error instanceof jsonwebtoken.JsonWebTokenError) {

            res.redirect('/unsuccessful-account-verification');
            return;

        }

        if(error instanceof jsonwebtoken.TokenExpiredError) {

            res.redirect('/unsuccessful-account-verification');
            return;

        }

        // Handle general errors
        res.redirect('/unsuccessful-account-verification');
        return;

    }

};

export default verifyAccountController;