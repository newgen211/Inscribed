import { Document, Schema, model } from 'mongoose';

export interface IRepost extends Document {

    userId:     Schema.Types.ObjectId;
    postId:     Schema.Types.ObjectId;
    created_at: Date;

}

const RepostSchema = new Schema<IRepost>({

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

export const Repost = model<IRepost>('Repost', RepostSchema);