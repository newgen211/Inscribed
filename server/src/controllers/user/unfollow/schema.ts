import { z } from 'zod';

export const UnfollowSchema = z.object({

    unfollowId: z.string().trim().min(1, { message: 'Unfollow ID is required' })

});

export type UnfollowSchema = z.infer<typeof UnfollowSchema>; 