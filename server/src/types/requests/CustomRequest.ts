import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

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