import mongoose, { Document, Model, Schema } from 'mongoose';

interface PostFields {

    userId: mongoose.Schema.Types.ObjectId;
    post: string;
    likes: mongoose.Schema.Types.ObjectId[],
    dislikes: mongoose.Schema.Types.ObjectId[],
    createdAt: Date

};

// Define the User Type based on Mongoose Docuemnt and the User fields
export interface PostDocument extends PostFields, Document{};

export const PostSchema = new Schema<PostDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Post model
export const Post: Model<PostDocument> = mongoose.model<PostDocument>('Post', PostSchema);
