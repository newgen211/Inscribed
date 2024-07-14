import mongoose, { Model, Schema } from 'mongoose';
import { FollowingDocument } from '../types/models/Following'; 


const FollowingSchema = new Schema<FollowingDocument>({

    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    followingId : { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    followDate: { type: Date, default: Date.now }
    

});

export const Following: Model<FollowingDocument> = mongoose.model<FollowingDocument>('Following', FollowingSchema);