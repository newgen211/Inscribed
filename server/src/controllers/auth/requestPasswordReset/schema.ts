import { z } from 'zod';

export const RequestPasswordResetSchema = z.object({

    email: z.string().trim()
        .min(1, { message: 'Email address is required' })
        .max(255, { message: 'Email address cannot exceed 50 characters in length' })
        .email({ message: 'Invalid email address' }),

});

export type RequestPasswordResetSchema = z.infer<typeof RequestPasswordResetSchema>;