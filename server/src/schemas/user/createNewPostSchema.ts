import { z } from 'zod';

export const CreateNewPostSchema = z.object({

    content: z.string().trim()
        .min(1, { message: 'Post cannot be empty' })
        .max(255, { message: 'Post cannont be longer than 255 characters' })

});

export type CreateNewPostSchema = z.infer<typeof CreateNewPostSchema>;