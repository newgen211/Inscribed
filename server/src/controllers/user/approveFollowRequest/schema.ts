import { z } from 'zod';

export const ApproveFollowRequestSchema = z.object({

    requesterId: z.string().trim().min(1, { message: 'Requester ID is required' })

});

export type FollowRequestSchema = z.infer<typeof ApproveFollowRequestSchema>; 