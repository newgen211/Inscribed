import { Request, Response, NextFunction } from 'express';
import { z, ZodEffects, ZodError, ZodObject } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../types/APIResponse.type';

export function validateRequestInput(schema: z.ZodObject<any, any> | ZodEffects<ZodObject<any, any>>) {

    return (req: Request, res: Response, next: NextFunction): void => {

        try {

            schema.parse(req.body);
            next();

        }
        catch(error) {

            // Log the error
            console.error(`Error occured while validating request body input: ${error}`);

            // Handle a validation error

            if(error instanceof ZodError) {

                const response: APIResponse = {
                    message: 'Input Validation Errors',
                    code:    StatusCodes.BAD_REQUEST,
                    errors: error.errors.map(err => ({ field: err.path.join('.'), message: err.message, code: err.code }))
                };

                res.status(response.code).json(response);
                return;

            }

            // Handle any other error
            const response: APIResponse = {
                message: 'Internal Server Error',
                code:    StatusCodes.INTERNAL_SERVER_ERROR
            };

            res.status(response.code).json(response);
            return;

        }

    };

}