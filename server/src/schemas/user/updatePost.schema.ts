import { z } from 'zod';

export const UpdatePostSchema = z.object({

    postId: z.string().trim()
        .min(1, { message: 'PostId is requried' }),

    content: z.string().trim()
        .min(1, { message: 'Post cannot be empty' })
        .max(255, { message: 'Post cannont be longer than 255 characters' })

}).strict();

export type UpdatePostSchema = z.infer<typeof UpdatePostSchema>;