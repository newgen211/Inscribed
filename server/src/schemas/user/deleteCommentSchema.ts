import { z } from 'zod';

export const DeleteCommentSchema = z.object({
    
    commentId: z.string()
        .min(1, { message: 'Comment ID is required' }),

});

export type DeleteCommentSchema = z.infer<typeof DeleteCommentSchema>;