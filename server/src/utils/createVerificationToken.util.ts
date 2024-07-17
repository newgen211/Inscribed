import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model'; 


const createVerificationToken = (user: IUser): string => {

    // Get the JWT Secret
    const jwt_secret: string | undefined = process.env.JWT_SECRET;

    // throw error if secret is not defined
    if(!jwt_secret) {
        throw new Error('JWT_SECRET is not defined in enviroment variables');
    }

    // create the token iat, exp, and payload
    const iat: number = Math.floor(Date.now() / 1000);
    const exp: number = iat + (15 * 60);                        // 15 minutes

    const payload = {
        userId: user.id,
        iat,
        exp,
        purpose: 'Account Verification'
    };

    // Create the token
    const token: string = jwt.sign(payload, jwt_secret, { algorithm: 'HS256' });

    return token;

};

export default createVerificationToken;