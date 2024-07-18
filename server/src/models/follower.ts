import { Document, Schema, model } from 'mongoose';

export interface IFollower extends Document {

    followerId:  Schema.Types.ObjectId;
    followingId: Schema.Types.ObjectId;
    created_at:  Date;

}

const FollowerSchema = new Schema<IFollower>({

    followerId: {
        type:     Schema.Types.ObjectId,
        ref:      'User',
        required: true
    },

    followingId: {
        type:     Schema.Types.ObjectId,
        ref:      'User',
        required: true
    },

    created_at: { 
        type:    Date,
        default: Date.now
    }

});

export const Follower = model<IFollower>('Follower', FollowerSchema);