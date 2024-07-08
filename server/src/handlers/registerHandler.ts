import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { User } from '../models/User';
import { UserDocument } from '../types/ModelTypes';
import { RegisterUserFields } from '../types/validationTypes';
import { APIResponse } from '../types/ResponseTypes';

const registerHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the register feields from the request body
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      confirm_password,
    }: RegisterUserFields = req.body;

    // See if the username and/or email is already taken
    const existingUser: UserDocument | null = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const response: APIResponse = {
        timestamp: Date.now(),
        message: 'Conflict error',
        code: 409,
        errors: [],
      };

      if (existingUser.email === email) {
        response.errors?.push({ field: 'email', message: 'Email is taken' });
      }

      if (existingUser.username === username) {
        response.errors?.push({ field: 'username', message: 'Username taken' });
      }

      res.status(409).json(response);
      return;
    }

    // Hash the user's password for safe stroage
    const hash = await argon2.hash(password);

    // Create the new user
    const user: UserDocument = new User({
      first_name,
      last_name,
      username,
      email,
      password: hash,
    });

    // Save the new user to the database
    await user.save();

    // Return a response message
    const response: APIResponse = {
      timestamp: Date.now(),
      message: 'User successfully registered',
      code: 201,
    };

    res.status(201).json(response);
    return;
  } catch (error) {
    const response: APIResponse = {
      timestamp: Date.now(),
      message: 'Internal Server Error',
      code: 500,
    };

    res.status(500).json(response);
    return;
  }
};

export default registerHandler;
