import mongoose, { Model, Schema } from 'mongoose';
import { PostDocument } from '../types/models/Post'; 

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
