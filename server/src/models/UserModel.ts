import mongoose, { Document, Model, Schema } from 'mongoose';
import { boolean } from 'zod';

interface UserFields {

    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    verified: boolean;
    locked: boolean;
    login_attempts: number;
    created_at: Date;
    last_login: Date;
    account_public: boolean;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    follow_requests: mongoose.Types.ObjectId[];
    requests: mongoose.Types.ObjectId[];
    

};

// Define the User Type based on Mongoose Docuemnt and the User fields
export interface UserDocument extends UserFields, Document{};

const UserSchema = new Schema<UserDocument>({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    locked: { type: Boolean, default: false },
    login_attempts: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now() },
    last_login: { type: Date, default: null },
    account_public: { type: Boolean, default: false },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    follow_requests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    requests: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    
     

});

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);