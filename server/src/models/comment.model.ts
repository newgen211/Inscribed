import { Document, Schema, model } from 'mongoose';

export interface IComment extends Document {

    userId:     Schema.Types.ObjectId;
    postId:     Schema.Types.ObjectId;
    content:    string;
    created_at: Date;
    updated_at: Date;

}

const CommentSchema = new Schema<IComment>({

    userId: {
        type:     Schema.Types.ObjectId,
        ref:      'User',
        required: true
    },

    postId: {
        type: Schema.Types.ObjectId,
        ref:  'Post',
        required: true
    },

    content: {
        type: String,
        required: true
    },

    created_at: {
        type:    Date,
        default: Date.now
    }

});

export const Comment = model<IComment>('Comment', CommentSchema);