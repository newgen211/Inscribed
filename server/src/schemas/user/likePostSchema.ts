import { z } from 'zod';

export const LikePostSchema = z.object({

    postId: z.string().trim()
        .min(1, { message: 'Post ID is required' })

});

export type LikePostSchema = z.infer<typeof LikePostSchema>;