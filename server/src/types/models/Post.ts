import mongoose, { Document } from 'mongoose';

interface PostFields {

    userId: mongoose.Schema.Types.ObjectId;
    post: string;
    likes: mongoose.Schema.Types.ObjectId[],
    dislikes: mongoose.Schema.Types.ObjectId[],
    createdAt: Date

};

// Define the User Type based on Mongoose Docuemnt and the User fields
export interface PostDocument extends PostFields, Document{};