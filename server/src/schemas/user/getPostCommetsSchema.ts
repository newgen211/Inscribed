import { z } from 'zod';

export const GetPostCommentsSchema = z.object({

    query: z.object({
        postId: z.string().nonempty({ message: 'Required' }),
        page: z.string().optional(),
    }),

});

export type GetPostCommentsSchema = z.infer<typeof GetPostCommentsSchema>;