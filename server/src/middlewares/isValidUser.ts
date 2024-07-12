import { Request, Response, NextFunction } from 'express';
import { APIResponse } from 'types/responses/APIResponse';
import jwt, { JwtPayload } from 'jsonwebtoken';

const isValidUser = async (req:Request, res:Response, next:NextFunction): Promise<void> => {

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
    jwt.verify(token, JWT_SECRET, (error, decoded) => {

            if(error) {

                const response: APIResponse = {

                    timestamp: Date.now(),
                    message: 'Failed to authenticate user token',
                    code: 401

                };

                res.status(response.code).json(response);
                return;

            }

            req.user = decoded as string | JwtPayload;
            next();

    });



};