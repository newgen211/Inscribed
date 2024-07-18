import { z } from 'zod';

export const CreateCommentSchema = z.object({
    postId: z.string()
        .min(1, { message: 'Post ID is required' }),
    content: z.string()
        .min(1, { message: 'Content is required' })
        .max(255, { message: 'Content cannot exceed 255 characters' })
});

export type CreateCommentSchema = z.infer<typeof CreateCommentSchema>;