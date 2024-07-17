import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {

    first_name:       string;
    last_name:        string;
    username:         string;
    email:            string;
    password:         string;
    profile_picture?: string;
    bio?:             string;
    follower_count:   number;
    following_count:  number;
    post_count:       number;
    created_at:       Date;
    last_login:       Date;
    account_verified: boolean;
    account_locked:   boolean;
    login_attempts:   number;

};

const UserSchema = new Schema<IUser>({

    first_name: {
        type:     String,
        required: true,
        unique:   false
    },

    last_name: {
        type:     String,
        required: true,
        unique:   false
    },

    username: {
        type:     String,
        required: true,
        unique:   true
    },

    email: {
        type:     String,
        required: true,
        unique:   true
    },

    password: {
        type:     String,
        required: true,
        unique:   false
    },

    profile_picture: {
        type:     String,
        required: false,
        unique:   false
    },

    bio: {
        type:     String,
        required: false,
        unique:   false
    },

    follower_count: {
        type:    Number,
        default: 0
    },

    following_count: {
        type:    Number,
        default: 0
    },

    post_count: {
        type:    Number, 
        default: 0
    },

    created_at: {
        type:    Date,
        default: Date.now
    },

    last_login: {
        type: Date,
        default: Date.now
    },

    account_verified: {
        type:    Boolean,
        default: false
    },

    account_locked: {
        type:    Boolean,
        default: false
    },

    login_attempts: {
        type:    Number,
        default: 0
    }

});

export const User = model<IUser>('User', UserSchema);