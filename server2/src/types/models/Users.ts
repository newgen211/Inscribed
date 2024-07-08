import { Document } from 'mongoose';

interface UserFields {

    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    verifed: boolean;
    locked: boolean;
    login_attempts: number;
    created_at: Date,
    last_login: Date

};

// Define the User Type based on Mongoose Docuemnt and the User fields
export interface UserDocument extends UserFields, Document{};