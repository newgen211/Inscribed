import { z } from 'zod';

export const NewPostSchema = z.object({

    post: z.string()
        .trim()
        .min(1, { message: 'Must write something in post' })
        .max(255, { message: 'Post cannot exceed 255 characters' })

});

export type NewPostSchema = z.infer<typeof NewPostSchema>;