import { Request, Response, NextFunction } from 'express';
import sanitzeHtml from 'sanitize-html';
import {
  SanitizeableRegisterFields,
  SanitizeOptions,
} from '../types/sanitizeTypes';
import { APIResponse } from '../types/ResponseTypes';
import { z, ZodError } from 'zod';
import { RegisterUserFields } from '../types/validationTypes';

const validateRegisterRequestBody = [
  // Sanitize the request body
  // Do not allow any html/js or escape characters
  (req: Request, res: Response, next: NextFunction): void => {
    // Extract the fields that need to be sanitized from the request body
    const {
      first_name,
      last_name,
      username,
      email,
    }: SanitizeableRegisterFields = req.body;

    // Set the santize options to be strict
    const santizeOptions: SanitizeOptions = {
      allowedTags: [],
      allowedAttributes: {},
    };

    // Create a error response
    const response: APIResponse = {
      timestamp: Date.now(),
      message: 'Sanitization Error',
      code: 400,
      errors: [],
    };

    // Sanitize the user's first_name
    let clean: string = sanitzeHtml(first_name, santizeOptions);

    if (first_name !== clean) {
      response.errors?.push({
        field: 'first_name',
        message: 'First name contains illegal/invalid characters',
      });
    }

    // Sanitize the user's last_name
    clean = sanitzeHtml(last_name, santizeOptions);

    if (last_name !== clean) {
      response.errors?.push({
        field: 'last_name',
        message: 'Last name contains illegal/invalid characters',
      });
    }

    // Sanitize the user's username
    clean = sanitzeHtml(username, santizeOptions);

    if (username !== clean) {
      response.errors?.push({
        field: 'username',
        message: 'Username contains illegal/invalid characters',
      });
    }

    // Sanitize the user's email
    clean = sanitzeHtml(email, santizeOptions);

    if (email !== clean) {
      response.errors?.push({
        field: 'email',
        message: 'Email contains illegal/invalid characters',
      });
    }

    // If the length of the errors array is not 0, there is a sanitization error. Return response to user
    if (response.errors?.length !== 0) {
      res.status(400).json(response);
      return;
    }

    next();
  },
  // Validate
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const {
        first_name,
        last_name,
        username,
        email,
        password,
        confirm_password,
      }: RegisterUserFields = RegisterUserFields.parse(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        // Consturct Error response
        const response: APIResponse = {
          timestamp: Date.now(),
          message: 'Validation Error',
          code: 400,
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code,
          })),
        };

        // Send error response
        res.status(400).json(response);
        return;
      }
    }

    next();
  },
];

export default validateRegisterRequestBody;
