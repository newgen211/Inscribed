import { NextFunction, Request, Response } from 'express';
import { APIResponse } from '../types/APIResponse';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { CustomRequest, CustomJwtPayload } from '../types/CustomRequest';

const isLoggedIn = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    
    // Get the JWT Secret
    const jwt_secret: string | undefined = process.env.JWT_SECRET;

    // throw error if secret is not defined
    if(!jwt_secret) {
        throw new Error('JWT_SECRET is not defined in enviroment variables');
    }

    // Get the auth header from the request
    const authHeader: string | undefined = req.headers.authorization;

    // Check to see if the user has a login token
    if(!authHeader) {

        const response: APIResponse = {
            message: 'No session token provided',
            code:    StatusCodes.UNAUTHORIZED
        };

        res.status(response.code).json(response);
        return;

    }

    // Extract the JWT from the Bearer Token
    const token: string = authHeader.split(' ')[1];

     //Validate the jwt
     jwt.verify(token, jwt_secret, (error, decoded) => {

        if(error) {

            const response: APIResponse = {

                message: 'Not logged in',
                code:    StatusCodes.UNAUTHORIZED

            };

            res.status(response.code).json(response);
            return;

        }

        req.user = decoded as string | CustomJwtPayload;
        next();

});


};

export default isLoggedIn;