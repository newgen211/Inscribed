import { Document, Schema, model } from 'mongoose';

export interface ILike extends Document {

    userId:     Schema.Types.ObjectId;
    postId:     Schema.Types.ObjectId;
    created_at: Date

}

const LikeSchema = new Schema<ILike>({

    userId: {
        type:     Schema.Types.ObjectId,
        ref:      'User',
        required: true
    },

    postId: {
        type:     Schema.Types.ObjectId,
        ref:      'Post',
        required: true
    },

    created_at: {
        type:    Date,
        default: Date.now
    }

});

export const Like = model<ILike>('Like', LikeSchema);