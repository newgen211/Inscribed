import { Document, Schema, model } from 'mongoose';

export interface IPost extends Document {

    userId:        Schema.Types.ObjectId,
    content:       string
    like_count:    number;
    repost_count:  number;
    comment_count: number;
    created_at:    Date;
    updated_at:    Date;

}

const PostSchema = new Schema<IPost>({

    userId: {
        type:     Schema.Types.ObjectId,
        ref:      'User',
        required: true
    },

    content: {
        type:     String,
        required: true
    },

    like_count: {
        type:    Number,
        default: 0
    },

    repost_count: {
        type:    Number,
        default: 0
    },

    comment_count: {
        type:    Number,
        default: 0
    },

    created_at: {
        type:    Date,
        default: Date.now
    },

    updated_at: {
        type:    Date,
        default: Date.now
    }

});

export const Post = model<IPost>('Post', PostSchema);