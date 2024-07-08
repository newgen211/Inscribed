import mongoose, { Model, Schema } from 'mongoose';
import { UserDocument } from '../types/models/Users';


const UserSchema = new Schema<UserDocument>({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifed: { type: Boolean, required: true, default: false },
    locked: { type: Boolean, required: true, default: false },
    login_attempts: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: true, default: Date.now() },
    last_login: { type: Date, required: true, default: null }

});

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);