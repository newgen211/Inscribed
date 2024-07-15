import { Request, Response } from 'express';
import { RequestVerifyEmailSchema } from './schema';


const requestVerifyEmailController = (req: Request, res: Response) => {

    try {

        // Use zod to validate user input
        const { email } = RequestVerifyEmailSchema.parse(req.body);

    }
    catch(error) {



    }

};

export default requestVerifyEmailController;