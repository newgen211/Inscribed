import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../types/response'; 
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

export interface CustomJwtPayload extends JwtPayload {
    userId: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    purpose: string;
}

export interface CustomRequest extends Request {
    user?: string | CustomJwtPayload;
}

const isLoggedIn = async (req:CustomRequest, res:Response, next:NextFunction): Promise<void> => {

    // Get the JWT Secret from the .env files
    const JWT_SECRET: string = process.env.JWT_SECRET ?? '';

    // Get the auth header from the request
    const authHeader: string | undefined = req.headers.authorization;

    // Check to see if the user has a login token
    if(!authHeader) {

        const response: APIResponse = {
            timestamp: Date.now(),
            message: 'No session token provided',
            code: 401
        };

        res.status(response.code).json(response);
        return;

    }

    // Extract the JWT from the Bearer Token
    const token: string = authHeader.split(' ')[1];

    //Validate the jwt
    jsonwebtoken.verify(token, JWT_SECRET, (error, decoded) => {

            if(error) {

                const response: APIResponse = {

                    timestamp: Date.now(),
                    message: 'Failed to authenticate user token',
                    code: 401

                };

                res.status(response.code).json(response);
                return;

            }

            req.user = decoded as string | CustomJwtPayload;
            next();

    });



};

export default isLoggedIn;