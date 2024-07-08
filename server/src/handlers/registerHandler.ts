import { Request, Response } from 'express';

const registerHandler = (req: Request, res: Response): void => {
  res.status(200).send('Register Endpoint');
};

export default registerHandler;
