import jsonwebtoken from 'jsonwebtoken';

const createResetToken = (userId: string): string => {

    // Create iat and exp times
    const iat: number = Math.floor(Date.now() / 1000);
    const exp: number = iat + (15 * 60);

    // Create JWT Payload
    const payload = {
        userId: userId,
        iat: iat,
        exp: exp,
        purpose: 'Reset Password'
    };

    // Get the JWT SECRET key
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET ?? '';

    // Create the verify token
    const token: string = jsonwebtoken.sign(payload, JWT_SECRET, { algorithm: 'HS256' });

    return token;

};

export default createResetToken;