import { z } from 'zod';

export const FollowUserSchema = z.object({

    followingId: z.string()
        .min(1, { message: 'User ID to follow is required' })
        
});

export type FollowUserSchema = z.infer<typeof FollowUserSchema>;