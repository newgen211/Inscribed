import jsonwebtoken from 'jsonwebtoken';
import { UserDocument } from '../models/UserModel';

const createSessionToken = (user: UserDocument): string => {

    // Create iat and exp times
    const iat: number = Math.floor(Date.now() / 1000);
    const exp: number = iat + (60 * 60);

    // Create JWT Payload
    const payload = {
        userId: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        user_name: user.username,
        email: user.email,
        iat: iat,
        exp: exp,
        purpose: 'Login Session'
    };

    // Get the JWT SECRET key
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET ?? '';

    // Create the verify token
    const token: string = jsonwebtoken.sign(payload, JWT_SECRET, { algorithm: 'HS256' });

    return token;

};

export default createSessionToken;