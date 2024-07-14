import mongoose, { Document } from 'mongoose';

interface FollowingFields {

    userId: mongoose.Schema.Types.ObjectId;
    followingId: mongoose.Schema.Types.ObjectId;
    followDate: Date;

};

// Define the User Type based on Mongoose Docuemnt and the User fields
export interface FollowingDocument extends FollowingFields, Document{};