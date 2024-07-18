import { z } from 'zod';

export const GetPostCommentsSchema = z.object({

    postId: z.string().trim()
        .min(1, { message: 'Post ID is required' })

});

export type GetPostCommentsSchema = z.infer<typeof GetPostCommentsSchema>;