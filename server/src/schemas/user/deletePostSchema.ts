import { z } from 'zod';

export const DeletePostSchema = z.object({
    postId: z.string()
        .min(1, { message: 'Post ID is required' })
});

export type DeletePostSchema = z.infer<typeof DeletePostSchema>;