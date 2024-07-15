import { z } from 'zod';

export const FollowRequestSchema = z.object({

    followId: z.string().trim().min(1, { message: 'Follow ID is required' })

});

export type FollowRequestSchema = z.infer<typeof FollowRequestSchema>; 